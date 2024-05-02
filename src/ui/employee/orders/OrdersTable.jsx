import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import DateHelper from "../../../util/helpers/DateHelper.js"
import StringHelper from "../../../util/helpers/StringHelper.js"
import { DELAY_MILLIS, orderStatuses, rowsPerPages } from "../../../util/Config.jsx"
import { noSearchResults } from "../../../util/helper.jsx"
import { Button, SelectInput, TDStatus, THeaders } from "../../common"
import { useContext } from "react"
import SearchFieldInput from "../../common/inputs/SearchFieldInput.jsx"
import { OrdersContext } from "./OrdersProvider.jsx"
import PaymentMethod from "../../../util/classes/PaymentMethod.js"
import { BiBlock, BiCheck, BiLinkAlt } from "react-icons/bi"
import OrderStatus from "../../../util/classes/OrderStatus.js"
import { openModal, setOrder, setSq } from "../../redux/ordersSlice.js"
import { delay, isEmpty, size } from "lodash"
import ModalType from "../../../util/classes/ModalType.js"
import { columns } from "./Util.jsx"

function OrdersTable() {
  const dispatch = useDispatch()

  const { sq, fetch } = useSelector((state) => state.orders)
  const { isLoading, data, meta, error } = fetch.response
  const { searchOrders } = useContext(OrdersContext)
  
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
        isLoading={isLoading} 
        sq={sq}
        data={data}
        error={error}
      />
      <PaginationContainer
        rowsPerPage={sq.per_page}
        currentPage={meta.current_page}
        lastPage={meta.last_page}
        isLoading={isLoading}
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
            isOptional
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
  const colSpan = size(columns)

  return (
    <div className="table-wrapper table-container">
      <table className="table">
        <thead>
          <THeaders columns={columns}/>
        </thead>
        <tbody>
          {
            isLoading ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.ORDERS_FETCHING}
              </TDStatus>
            ) : error ? (
              <TDStatus colSpan={colSpan}>
                {error.message ? error.message : GenericMessage.PRODUCTS_ERROR}
              </TDStatus>
            ) : noSearchResults(sq, data) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.ORDERS_NO_MATCH}
              </TDStatus>
            ) : isEmpty(data) ? (
              <TDStatus colSpan={colSpan}>
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

function TDOrder({order, onApprove, onReject}) {
  const referenceNumber = StringHelper.truncate(order.reference_number)
  const customer = StringHelper.truncate(order.customer.full_name)
  const amountDue = StringHelper.toPesoCurrency(Number(order.amount_due))
  const totalItems = StringHelper.toPcs(order.number_of_items)
  const status = OrderStatus.toObject(order.status)
  const paymentMethod = PaymentMethod.toMethod(order.payment_method)
  const salesperson = StringHelper.truncate(order.employee.full_name)
  const dateCreated = DateHelper.toIsoStandard(order.created_at)
  
  return (
    <tr key={order.id}>
      <td>
        <a href="#">
          <BiLinkAlt className="me-1" />
          {referenceNumber}
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
        <span className="badge text-bg-light">
          {paymentMethod}
        </span>
      </td>
      <td>{customer}</td>
      <td>{salesperson}</td>
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

export default OrdersTable