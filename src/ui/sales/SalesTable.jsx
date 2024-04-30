import { BiLinkAlt } from "react-icons/bi"
import { Button, SelectInput, TDStatus, THeaders } from "../common/index.jsx"
import { columns } from "./Util.jsx"
import { noSearchResults } from "../../util/helper.jsx"
import { isEmpty, size } from "lodash"
import StringHelper from "../../util/helpers/StringHelper.js"
import { PaymentMethod, OrderStatus, GenericMessage } from "../../util/classes/index.js"
import DateHelper from "../../util/helpers/DateHelper.js"
import { rowsPerPages } from "../../util/Config.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setSq } from "../redux/salesSlice.js"
import { useContext } from "react"
import { SalesContext } from "./SalesProvider.jsx"
import { Link } from "react-router-dom"
import { setOrder } from "../redux/checkoutsSlice.js"

function SalesTable() {
  const { sq, fetch } = useSelector((state) => state.sales)
  const { isLoading, data, meta, error } = fetch.response
  const { searchSales } = useContext(SalesContext)

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
        isLoading={isLoading}
        sq={sq}
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
  const dispatch = useDispatch()

  const handleClick = (sale) => {
    dispatch(setOrder(sale))
  }

  return (
    <div className="table-wrapper table-container">
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
            ) : noSearchResults(sq, data) ? (
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
                onClick={() => handleClick(sale)}
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
function TDSale({sale, onClick}) {
  const refNumber = StringHelper.truncate(sale.reference_number, 15)
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
        <Link 
          to="checkouts"
          onClick={onClick}>
          <BiLinkAlt className="me-1" />
          {refNumber}
        </Link>
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
        <span className="badge text-bg-light">
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
function PaginationContainer({rowsPerPage, currentPage, lastPage, isLoading, onChange, onPrevious, onNext}) {
  return (
    <div className="pagination-container">
      <div className="d-flex flex-row align-items-center gap-2">
        <label className="fw-medium fs-7 text-nowrap">Rows per page</label>
        <SelectInput
          name="per_page"
          options={rowsPerPages}
          value={rowsPerPage}
          onChange={onChange}
          onRender={(option) => `${option} rows`}
        />
      </div>
      <div className="d-flex flex-row align-items-center gap-2">
        <label className="fw-medium fs-7 text-nowrap">{`Page ${currentPage} of ${lastPage}`}</label>
        <div className="btn-group">
          <Button
            variant="light" 
            isDisabled={isLoading || currentPage <= 1}
            onClick={onPrevious}
          >
            Prev
          </Button>
          <Button 
            variant="light" 
            isDisabled={isLoading || currentPage >= lastPage} 
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
export default SalesTable