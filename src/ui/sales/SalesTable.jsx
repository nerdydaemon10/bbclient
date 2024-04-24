import "boxicons"
import { BiLinkAlt } from "react-icons/bi"
import { GenericMessage } from "../../util/classes"
import { SecondaryButton, SelectInput, TDStatus, THeaders } from "../common"
import { columns } from "./Util.jsx"
import { isSearchResultsEmpty } from "../../util/helper.jsx"
import { isEmpty, size } from "lodash"
import StringHelper from "../../util/helpers/StringHelper.js"
import PaymentMethod from "../../util/classes/PaymentMethod.js"
import DateHelper from "../../util/helpers/DateHelper.js"
import { rowsPerPages } from "../../util/Config.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setSq } from "../redux/salesSlice.js"
import { useContext } from "react"
import { SalesContext } from "./SalesProvider.jsx"
import OrderStatus from "../../util/classes/OrderStatus.js"

function SalesTable() {
  const { sq, fetchSalesRes } = useSelector((state) => state.sales)
  const { searchSales } = useContext(SalesContext)
  const { isLoading, data, meta, error } = fetchSalesRes

  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setSq({ ...sq, [e.target.name]: e.target.value }))
    searchSales.cancel()
  }
  const handlePrevious = () => {
    let page = sq.page > 1 ? sq.page - 1 : 1 

    dispatch(setSq({ ...sq, page: page }))
    searchSales.cancel()
  }
  const handleNext = () => {
    let page = sq.page < meta.last_page ? sq.page + 1 : meta.last_page

    dispatch(setSq({ ...sq, page: page }))
    searchSales.cancel()
  }

  return (
    <>
      <TableContainer 
        sq={sq}
        isLoading={isLoading}
        data={data}
        error={error}
      />
      <PaginationContainer
        isLoading={isLoading}
        rowsPerPage={sq.per_page}
        currentPage={meta.current_page}
        lastPage={meta.last_page}
        onChange={handleChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  )
}
function TableContainer({isLoading, sq, data, error}) {
  const colSpan = size(columns)

  return (
    <div className="table-container app-table-wrapper">
      <table className="table">
        <thead>
          <THeaders columns={columns} />
        </thead>
        <tbody>
          {
            isLoading ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.SALES_FETCHING}
              </TDStatus>
            ) : error ? (
              <TDStatus colSpan={colSpan}>
                {error.message ? error.message : GenericMessage.SALES_ERROR}
              </TDStatus>
            ) : isSearchResultsEmpty(sq, data) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.SALES_NO_MATCH}
              </TDStatus>
            ) : isEmpty(data) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.SALES_EMPTY}
              </TDStatus>
            ) : data ? data.map((sale, index) => (
              <TDSale
                key={index}
                sale={sale}
              />
            )) : (
              <></>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
function TDSale({sale}) {
  const refNumber = StringHelper.truncate(sale.reference_number)
  const amountDue = StringHelper.toPesoCurrency(Number(sale.amount_due))
  const totalItems = StringHelper.toPcs(sale.number_of_items)
  const status = OrderStatus.toObject(sale.status)
  const paymentMethod = PaymentMethod.toMethod(sale.payment_method)
  const customer = StringHelper.truncate(sale.customer.full_name)
  const salesperson = StringHelper.truncate(sale.employee.full_name)
  const commission = StringHelper.toPesoCurrency(sale.commission)
  const dateCreated = DateHelper.toIsoStandard(sale.created_at)
  
  return (
    <tr key={sale.id}>
      <td>
        <a href="#">
          <BiLinkAlt className="me-1" />
          {refNumber}
        </a>
      </td>
      <td>{amountDue}</td>
      <td>{totalItems}</td>
      <td>
        <span className={`badge ${status.badge}`}>
          {status.icon}
          {status.name}
        </span>
      </td>
      <td>
        <span className="badge bg-light">
          {paymentMethod}
        </span>
      </td>
      <td>{customer}</td>
      <td>{salesperson}</td>
      <td>{commission}</td>
      <td>{dateCreated}</td>
    </tr>
  )
}
function PaginationContainer({isLoading, rowsPerPage, currentPage, lastPage, onChange, onPrevious, onNext}) {
  return (
    <div className="pagination-container">
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <SelectInput 
          name="per_page"
          options={rowsPerPages}
          value={rowsPerPage}
          onChange={onChange}
          onRender={(option) => `${option} rows`}
        />
      </div>
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">{`Page ${currentPage} of ${lastPage}`}</label>
        <div className="btn-group">
          <SecondaryButton isDisabled={isLoading || currentPage <= 1} onClick={onPrevious}>Prev</SecondaryButton>
          <SecondaryButton isDisabled={isLoading || currentPage >= lastPage } onClick={onNext}>Next</SecondaryButton>
        </div>
      </div>
    </div>
  )
}
export default SalesTable