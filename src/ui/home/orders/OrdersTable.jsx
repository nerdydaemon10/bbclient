import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../utils/classes/GenericMessage.jsx"
import { columns, columnsSize } from "./Util.jsx"
import DateHelper from "../../../utils/helpers/DateHelper.jsx"
import StringHelper from "../../../utils/helpers/StringHelper.jsx"
import { DELAY_MILLIS, orderStatuses, rowsPerPages } from "../../../utils/Config.jsx"
import { isItemsEmpty, isSearchHasEmptyResults } from "../../../utils/Helper.jsx"
import { SecondaryButton, SelectInput, TDStatus, THeaders } from "../../common"
import { useContext } from "react"
import ModalType from "../../../utils/classes/ModalType.jsx"
import { resetStates, setProduct, setSearchQuery, toggleModal } from "../../redux/inventorySlice.jsx"
import SearchFieldInput from "../../common/inputs/SearchFieldInput.jsx"
import { OrdersContext } from "./OrdersProvider.jsx"
import OrderStatus from "../../../utils/classes/OrderStatus.jsx"
import PaymentMethod from "../../../utils/classes/PaymentMethod.jsx"
import { BiLinkAlt } from "react-icons/bi"

function OrdersTable() {
  const dispatch = useDispatch()

  const { searchQuery } = useSelector((state) => state.inventory)
  const { apiResource, handleSearchProductsAsync } = useContext(OrdersContext)
  const { data, meta } = apiResource.data

  const handleChange = (e) => {
    dispatch(setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value }))
    handleSearchProductsAsync.cancel()
  }

  const handlePrevious = () => {
    let page = searchQuery.page > 1 ? searchQuery.page - 1 : 1
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    handleSearchProductsAsync.cancel()
  }
  const handleNext = () => {
    let page = searchQuery.page < meta.last_page ? searchQuery.page + 1 : meta.last_page
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    handleSearchProductsAsync.cancel()
  }

  return (
    <>
      <FilteringContainer 
        name={searchQuery.name}
        status={searchQuery.status}
        onChange={handleChange}
      />
      <TableContainer 
        isLoading={apiResource.isLoading} 
        searchQuery={searchQuery}
        data={data}
        error={apiResource.error}
      />
      <PaginationContainer
        rowsPerPage={searchQuery.per_page}
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
function FilteringContainer({name, category, onChange}) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(toggleModal({modalType: ModalType.CREATE, open: true}))
  }

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
            name="category_id"
            options={orderStatuses}
            defaultOption="-- All Statuses --"
            value={category}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}
function TableContainer({isLoading, searchQuery, data, error}) {
  const dispatch = useDispatch()

  const handleUpdateClick = (product) => {
    // reset errors before showing modal
    dispatch(resetStates())
    dispatch(setProduct(product))
    
    // adding delay to finish the hiding effect of errors
    setTimeout(() => dispatch(toggleModal({
      modalType: ModalType.UPDATE, open: true}
    )), DELAY_MILLIS)
  }

  const handleRemoveClick = (product) => {
    dispatch(setProduct(product))
    dispatch(toggleModal({modalType: ModalType.REMOVE, open: true}))
  }

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
            ) : isSearchHasEmptyResults(searchQuery, data) ? (
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
                onUpdateClick={handleUpdateClick}
                onRemoveClick={handleRemoveClick}
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