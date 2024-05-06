import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../util/classes/GenericMessage.js"
import { columns, columnsSize } from "./Util.jsx"
import DateHelper from "../../util/helpers/DateHelper.js"
import StringHelper from "../../util/helpers/StringHelper.js"
import { DELAY_MILLIS, rowsPerPages } from "../../util/Config.jsx"
import { BiPlusCircle } from "react-icons/bi"
import { noSearchResults } from "../../util/helper.jsx"
import { Button, SelectInput, TDStatus, THeaders } from "../common"
import { useContext } from "react"
import { EmployeesContext } from "./EmployeesProvider.jsx"
import { openModal, resetStates, setCustomer, setSq } from "../redux/customersSlice.js"
import ModalType from "../../util/classes/ModalType.js"
import SearchFieldInput from "../common/inputs/SearchFieldInput.jsx"
import { delay, isEmpty } from "lodash"

function CustomersTable() {
  const dispatch = useDispatch()
  
  const { sq, fetch } = useSelector((state) => state.customers)
  
  const { isLoading, data, meta, error } = fetch.response
  const { searchCustomers } = useContext(EmployeesContext)

  const handleChange = (e) => {
    dispatch(setSq({ ...sq, [e.target.name]: e.target.value }))
    searchCustomers.cancel()
  }
  const handlePrevious = () => {
    let page = sq.page > 1 ? sq.page - 1 : 1
    dispatch(setSq({ ...sq, page: page }))
    searchCustomers.cancel()
  }
  const handleNext = () => {
    let page = sq.page < meta.last_page ? sq.page + 1 : meta.last_page
    dispatch(setSq({ ...sq, page: page }))
    searchCustomers.cancel()
  }

  return (
    <>
      <FilteringContainer 
        fullName={sq.full_name}
        onChange={handleChange}
      />
      <TableContainer 
        isLoading={isLoading}
        searchQuery={sq}
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
function FilteringContainer({fullName, onChange}) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(openModal(ModalType.CREATE))
  }

  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            name="full_name"
            placeholder="Search by Employee..."
            value={fullName}
            onChange={onChange}
          />
        </div>
        <div className="col-6">
          <Button variant="light" onClick={handleClick}>
            <BiPlusCircle className="me-1" />
            Create Employee
          </Button>
        </div>
      </div>
    </div>
  )
}
function TableContainer({isLoading, searchQuery, data, error}) {
  const dispatch = useDispatch()

  const handleUpdate = (customer) => {
    dispatch(resetStates())
    dispatch(setCustomer(customer))
    delay(() => dispatch(openModal(ModalType.UPDATE)), DELAY_MILLIS)
  }

  const handleRemove = (customer) => {
    dispatch(setCustomer(customer))
    delay(() => dispatch(openModal(ModalType.REMOVE)), DELAY_MILLIS)
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
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.ITEMS_FETCHING.replace("{{items}}", "customers")}
              </TDStatus>
            ) : error ? (
              <TDStatus colSpan={columnsSize}>
                {error.message ? error.message : GenericMessage.ITEMS_ERROR.replace("{{items}}", "customers")}
              </TDStatus>
            ) : noSearchResults(searchQuery, data) ? (
              <TDStatus colSpan={columnsSize}>
              {GenericMessage.ITEMS_NO_MATCH.replace("{{items}}", "customers")}
              </TDStatus>
            ) : isEmpty(data) ? (
              <TDStatus colSpan={columnsSize}>
                {GenericMessage.ITEMS_EMPTY.replace("{{items}}", "customers")}
              </TDStatus>
            ) : data ? data.map((customer, index) => (
              <TDCustomer
                key={index}
                customer={customer}
                onUpdate={() => handleUpdate(customer)}
                onRemove={() => handleRemove(customer)}
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

function TDCustomer({customer, onUpdate, onRemove}) {
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
          onClick={onUpdate}
        >
          Update
        </Button>
        <Button 
          variant="light"
          size="sm"
          onClick={onRemove}
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