import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { customerCols } from "./Util.jsx"
import StringHelper from "../../../util/helpers/StringHelper.js"
import { rowsPerPages } from "../../../util/Config.jsx"
import { isItemsEmpty, isSearchResultsEmpty } from "../../../util/helper.jsx"
import { PrimaryButton, SecondaryButton, SelectInput, TDStatus, THeaders } from "../../common"
import { useContext } from "react"
import { setCustomer, setSearchQuery, unsetCustomer } from "../../redux/posSlice.js"
import SearchFieldInput from "../../common/inputs/SearchFieldInput.jsx"
import { size } from "lodash"
import { PosContext } from "./PosProvider.jsx"
import BaseButton from "../../common/buttons/BaseButton.jsx"

function CustomersTable() {
  const dispatch = useDispatch()

  const { customers, customer } = useSelector((state) => state.pos)
  const { searchQuery, fetchResponse } = customers
  const { isLoading, data, meta, error } = fetchResponse

  const { searchCustomers } = useContext(PosContext)

  const handleChange = (e) => {
    dispatch(setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value, page: 1 }))
    searchCustomers.cancel()
  }
  
  const handlePrevious = () => {
    let page = searchQuery.page > 1 ? searchQuery.page - 1 : 1
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    searchCustomers.cancel()
  }
  const handleNext = () => {
    let page = searchQuery.page < meta.last_page ? searchQuery.page + 1 : meta.last_page
    dispatch(setSearchQuery({ ...searchQuery, page: page }))
    searchCustomers.cancel()
  }

  return (
    <>
      <FilteringContainer 
        fullName={searchQuery.full_name}
        onChange={handleChange}
      />
      <TableContainer 
        customerId={customer ? customer.id : 0}
        isLoading={isLoading}
        searchQuery={searchQuery}
        data={data}
        error={error}
      />
      <PaginationContainer
        rowsPerPage={searchQuery.per_page}
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
function FilteringContainer({fullName, onChange}) {
  return (
    <div className="filtering-container is-customers-table">
      <div className="row gx-2">
        <div className="col-12">
          <SearchFieldInput
            name="full_name"
            placeholder="Search by Customer..."
            value={fullName}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}
function TableContainer({customerId, isLoading, searchQuery, data, error}) {
  const dispatch = useDispatch()
  
  const colSpan = size(customerCols)

  const handleClick = (customer) => {
    const isSelected = customer.id == customerId
    
    if (isSelected) {
      dispatch(unsetCustomer())
    } else {
      dispatch(setCustomer(customer))
    }
  }
  
  return (
    <div className="app-table-wrapper table-container">
      <table className="table">
        <thead>
          <THeaders columns={customerCols}/>
        </thead>
        <tbody>
          {
            isLoading ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.CUSTOMERS_FETCHING}
              </TDStatus>
            ) : error ? (
              <TDStatus colSpan={colSpan}>
                {error.message ? error.message : GenericMessage.CUSTOMERS_ERROR}
              </TDStatus>
            ) : isSearchResultsEmpty(searchQuery, data) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.CUSTOMERS_NO_MATCH}
              </TDStatus>
            ) : isItemsEmpty(data) ? (
              <TDStatus colSpan={colSpan}>
                {GenericMessage.CUSTOMERS_EMPTY}
              </TDStatus>
            ) : data ? data.map((customer, index) => (
              <TDCustomer
                key={index}
                customer={customer}
                isSelected={customer.id == customerId}
                onClick={() => handleClick(customer)}
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
function TDCustomer({customer, isSelected, onClick}) {
  const fullName = StringHelper.truncate(customer.full_name)
  const address = StringHelper.truncate(customer.address)
  const phoneNumber = StringHelper.truncate(customer.phone_number)
  const emailAddress = StringHelper.truncate(customer.email_address)

  return (
    <tr key={customer.id}>
      <td>{fullName}</td>
      <td>{address}</td>
      <td>{phoneNumber}</td>
      <td>{emailAddress}</td>
      <td>
        <BaseButton
          variant={isSelected ? "btn-secondary" : "btn-dark"}
          size="btn-sm"
          onClick={onClick}
        >
          {isSelected ? "Remove" : "Choose" }
        </BaseButton>
      </td>
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

export default CustomersTable