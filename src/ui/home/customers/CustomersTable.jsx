import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { columns, columnsSize } from "./Util.jsx"
import DateHelper from "../../../util/helpers/DateHelper.js"
import StringHelper from "../../../util/helpers/StringHelper.js"
import { DELAY_MILLIS, rowsPerPages } from "../../../util/Config.jsx"
import { BiPlusCircle } from "react-icons/bi"
import { isItemsEmpty, isSearchResultsEmpty } from "../../../util/helper.jsx"
import { Button, SelectInput, TDStatus, THeaders } from "../../common"
import { useContext } from "react"
import { CustomersContext } from "./CustomersProvider.jsx"
import { resetStates, setCustomer, setSearchQuery, toggleModal } from "../../redux/customersSlice.js"
import ModalType from "../../../util/classes/ModalType.jsx"
import SearchFieldInput from "../../common/inputs/SearchFieldInput.jsx"

function CustomersTable() {
  const dispatch = useDispatch()

  const { searchQuery } = useSelector((state) => state.customers)
  const { apiResource, handleSearchCustomerAsync } = useContext(CustomersContext)
  const { data, meta } = apiResource.data

  const handleChange = (e) => {
    dispatch(setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value, page: 1 }))
    handleSearchCustomerAsync.cancel()
  }
  
  const handlePrevious = () => {
    let page = searchQuery.page > 1 ? searchQuery.page - 1 : 1
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    handleSearchCustomerAsync.cancel()
  }
  const handleNext = () => {
    let page = searchQuery.page < meta.last_page ? searchQuery.page + 1 : meta.last_page
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    handleSearchCustomerAsync.cancel()
  }

  return (
    <>
      <FilteringContainer 
        fullName={searchQuery.full_name}
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
function FilteringContainer({fullName, onChange}) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(toggleModal({modalType: ModalType.CREATE, open: true}))
  }

  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            name="full_name"
            placeholder="Search by Customer..."
            value={fullName}
            onChange={onChange}
          />
        </div>
        <div className="col-6">
          <Button variant="light" onClick={handleClick}>
            <BiPlusCircle className="me-1" />
            Create Customer
          </Button>
        </div>
      </div>
    </div>
  )
}
function TableContainer({isLoading, searchQuery, data, error}) {
  const dispatch = useDispatch()

  const handleUpdateClick = (customer) => {
    // reset errors before showing modal
    dispatch(resetStates())
    dispatch(setCustomer(customer))

    // adding delay to finish the hiding effect of errors
    setTimeout(() => dispatch(toggleModal({
      modalType: ModalType.UPDATE, open: true}
    )), DELAY_MILLIS)
  }

  const handleRemoveClick = (customer) => {
    dispatch(setCustomer(customer))
    dispatch(toggleModal({modalType: ModalType.REMOVE, open: true}))
  }
  
  return (
    <div className="table-wrapper table-container">
      <table className="table">
        <thead>
          <THeaders columns={columns}/>
        </thead>
        <tbody>
          {
            isLoading ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.ITEMS_FETCHING.replace("{{items}}", "customers")}
              </TDStatus>
            ) : error ? (
              <TDStatus colSpan={columnsSize}>
                {error.message ? error.message : GenericMessage.ITEMS_ERROR.replace("{{items}}", "customers")}
              </TDStatus>
            ) : isSearchResultsEmpty(searchQuery, data) ? (
              <TDStatus colSpan={columnsSize}>
              {GenericMessage.ITEMS_NO_MATCH.replace("{{items}}", "customers")}
              </TDStatus>
            ) : isItemsEmpty(data) ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.ITEMS_EMPTY.replace("{{items}}", "customers")}
              </TDStatus>
            ) : data ? data.map((customer, index) => (
              <TDCustomer
                key={index}
                customer={customer}
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

function TDCustomer({customer, onUpdateClick, onRemoveClick}) {
  const fullName = StringHelper.truncate(customer.full_name)
  const address = StringHelper.truncate(customer.address)
  const phoneNumber = StringHelper.truncate(customer.phone_number)
  const emailAddress = StringHelper.truncate(customer.email_address)
  const createdBy = StringHelper.truncate(customer.created_by)
  const dateCreated = DateHelper.toIsoStandard(customer.created_at)
  const dateModified = DateHelper.toIsoStandard(customer.updated_at)

  return (
    <tr key={customer.id}>
      <td>{fullName}</td>
      <td>{address}</td>
      <td>{phoneNumber}</td>
      <td>{emailAddress}</td>
      <td>{createdBy}</td>
      <td>{dateCreated}</td>
      <td>{dateModified}</td>
      <td className="hstack gap-1">
        <Button 
          variant="dark"
          size="sm"
          onClick={() => onUpdateClick(customer)}
        >
          Update
        </Button>
        <Button 
          variant="light"
          size="sm"
          onClick={() => onRemoveClick(customer)}
        >
          Remove
        </Button>
      </td>
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

export default CustomersTable