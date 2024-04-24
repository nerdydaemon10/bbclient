import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { columns, columnsSize } from "./Util.jsx"
import DateHelper from "../../../util/helpers/DateHelper.js"
import StringHelper from "../../../util/helpers/StringHelper.js"
import { DELAY_MILLIS, orderStatuses, rowsPerPages } from "../../../util/Config.jsx"
import { isItemsEmpty, isSearchResultsEmpty } from "../../../util/helper.jsx"
import { SecondaryButton, SelectInput, TDStatus, THeaders } from "../../common"
import { useContext } from "react"
import ModalType from "../../../util/classes/ModalType.jsx"
import SearchFieldInput from "../../common/inputs/SearchFieldInput.jsx"
import { OrdersContext } from "./OrdersProvider.jsx"
import PaymentMethod from "../../../util/classes/PaymentMethod.js"
import { BiLinkAlt } from "react-icons/bi"
import OrderStatus from "../../../util/classes/OrderStatus.js"
import { setSq } from "../../redux/ordersSlice.js"

function OrdersTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.orders)
  const { apiResource, searchOrders } = useContext(OrdersContext)
  const { data, meta } = apiResource.data
  
  const handleChange = (e) => {
    dispatch(setSq({ ...sq, [e.target.name]: e.target.value }))
    searchOrders.cancel()
  }
  const handlePrevious = () => {
    let page = sq.page > 1 ? sq.page - 1 : 1
    dispatch(setSq({ ...sq, page: page }))
    searchOrders.cancel()
  }
  const handleNext = () => {
    let page = sq.page < meta.last_page ? sq.page + 1 : meta.last_page
    dispatch(setSq({ ...sq, page: page }))
    searchOrders.cancel()
  }

  return (
    <>
      <FilteringContainer 
        name={sq.name}
        status={sq.status}
        onChange={handleChange}
      />
      <TableContainer 
        isLoading={apiResource.isLoading} 
        sq={sq}
        data={data}
        error={apiResource.error}
      />
      <PaginationContainer
        rowsPerPage={sq.per_page}
        currentPage={meta.current_page}
        lastPage={meta.last_page}
        isLoading={apiResource.isLoading}
        onChange={handleChange} 
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  )
}
function FilteringContainer({name, status, onChange}) {
  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            name="name"
            placeholder="Search by Order..."
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="col-6">
          <SelectInput
            name="status"
            options={orderStatuses}
            isAllCategoriesEnabled
            value={status}
            onChange={onChange}
            onRender={(option) => OrderStatus.toStatus(option)}
          />
        </div>
      </div>
    </div>
  )
}
function TableContainer({isLoading, sq, data, error}) {
  return (
    <div className="app-table-wrapper table-container">
      <table className="table">
        <thead>
          <THeaders columns={columns}/>
        </thead>
        <tbody>
          {
            isLoading ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.ORDERS_FETCHING}
              </TDStatus>
            ) : error ? (
              <TDStatus colSpan={columnsSize}>
                {error.message ? error.message : GenericMessage.PRODUCTS_ERROR}
              </TDStatus>
            ) : isSearchResultsEmpty(sq, data) ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.ORDERS_NO_MATCH}
              </TDStatus>
            ) : isItemsEmpty(data) ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.ORDERS_EMPTY}
              </TDStatus>
            ) : data ? data.map((order, index) => (
              <TDOrder
                key={index}
                order={order}
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

function TDOrder({order}) {
  const referenceNumber = StringHelper.truncate(order.reference_number)
  const customer = StringHelper.truncate(order.customer.full_name)
  const amountDue = StringHelper.toPesoCurrency(Number(order.amount_due))
  const totalItems = StringHelper.toPcs(order.number_of_items)
  const status = StringHelper.truncate(order.status)
  const paymentMethod = PaymentMethod.toMethod(order.payment_method)
  const creator = StringHelper.truncate(order.employee.full_name)
  const dateCreated = DateHelper.toIsoStandard(order.created_at)
  const dateModified = DateHelper.toIsoStandard(order.updated_at)

  return (
    <tr key={order.id}>
      <td>
        <a href="#">
          <BiLinkAlt className="me-1" />
          {referenceNumber}
        </a>
      </td>
      <td>{customer}</td>
      <td>{amountDue}</td>
      <td>{totalItems}</td>
      <td>
        <span className="badge bg-light">
          {status}
        </span>
      </td>
      <td>
        <span className="badge bg-light">
          {paymentMethod}
        </span>
      </td>
      <td>{creator}</td>
      <td>{dateCreated}</td>
      <td>{dateModified}</td>
    </tr>
  )
}
function PaginationContainer({rowsPerPage, currentPage, lastPage, isLoading, onChange, onPrevious, onNext}) {
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

export default OrdersTable