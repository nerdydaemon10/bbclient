/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../util/classes/GenericMessage.js"
import StringHelper from "../../util/helpers/StringHelper.js"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { BiCoffee, BiPlusCircle, BiSolidCheckCircle, BiSolidCoffee } from "react-icons/bi"
import { isEntitySelected, noSearchResults } from "../../util/helper.jsx"
import { useCallback, useEffect, useState } from "react"
import ModalType from "../../util/classes/ModalType.js"
import SearchFieldInput from "../common/inputs/SearchFieldInput.jsx"
import { debounce, delay, isEmpty, size } from "lodash"
import { useFetchEmployeesQuery } from "../../data/services/employees.js"
import { Button, THeaders, TablePagination, TableStatus } from "../common"
import Role from "../../util/classes/Role.js"
import { openModal, setEmployee, setSq } from "../redux/employeesSlice.js"
import DateHelper from "../../util/helpers/DateHelper.js"
import local from "../../util/local.js"

const columns = ["Full Name", "Username", "Role", "Status", "Date/Logged In", "Date/Logged Out", "Action"]
const colSpan = size(columns)

function EmployeesTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.employees)
  const [sqtemp, setSqtemp] = useState(sq)

  const debouncer = useCallback(debounce((sqtemp) => {
    setSqtemp(sqtemp)
  }, DELAY_MILLIS), [])

  const { isLoading, isFetching, data, error } = useFetchEmployeesQuery(sqtemp)
  const meta = data ? data.meta : { current_page: 1, last_page: 1 }

  const handleChange = (e) => {
    dispatch(setSq({ ...sq, [e.target.name]: e.target.value}))
  }
  const handlePrevious = () => {
    let page = sq.page > 1 ? sq.page - 1 : 1
    dispatch(setSq({ ...sq, page: page }))
  }
  const handleNext = () => {
    let page = sq.page < meta.last_page ? sq.page + 1 : meta.last_page
    dispatch(setSq({ ...sq, page: page }))
  }

  useEffect(() => {
    debouncer(sq)
  }, [sq])

  return (
    <>
      <FilteringContainer 
        search={sq.search}
        onChange={handleChange}
      />
      <TableContainer 
        sq={sq}
        data={data}
        error={error}
        isFetching={isLoading || isFetching}
      />
      <TablePagination 
        meta={meta}
        rowsPerPage={sq.per_page}
        isFetching={isLoading || isFetching}
        onChange={handleChange}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  )
}
function FilteringContainer({search, onChange}) {
  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(openModal(ModalType.CREATE))
  }

  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            placeholder="Search by Employee..."
            name="search"
            value={search}
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
function TableContainer({sq, data, error, isFetching}) {
  const dispatch = useDispatch()

  const user = local.get("user")

  const handleUpdate = (employee) => {
    dispatch(setEmployee(employee))
    delay(() => dispatch(openModal(ModalType.UPDATE)), DELAY_MILLIS)
  }
  const handleRemove = (employee) => {
    dispatch(setEmployee(employee))
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
            isFetching ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.EMPLOYEES_FETCHING} 
              />
            ) : error ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.EMPLOYEES_ERROR} 
              />
            ) : noSearchResults(sq, data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.EMPLOYEES_NO_MATCH} 
              />
            ) : isEmpty(data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.EMPLOYEES_EMPTY} 
              />
            ) : data.data.map((item, index) => (
              <TableData 
                key={index} 
                item={item} 
                isUser={isEntitySelected(item, user)}
                onUpdate={() => handleUpdate(item)}
                onRemove={() => handleRemove(item)}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

function TableData({item, isUser, onUpdate, onRemove}) {
  const fullName = StringHelper.truncate(item.full_name)
  const username = `@${StringHelper.truncate(item.username)}`
  const role = Role.toRole(item.role_id)
  const isAdmin = Role.isAdmin(item.role_id)
  const status = StringHelper.truncate(item.status)
  const loggedIn = DateHelper.toDateTime(item.last_login_at)
  const loggedOut = DateHelper.toDateTime(item.last_login_at)

  return (
    <tr>
      <td>
        {fullName}
        {isUser && <span className="ms-1">(You)</span>}
        {isAdmin && <span className="ms-1"><BiSolidCheckCircle /></span>}
      </td>
      <td>{username}</td>
      <td>
        <span className="badge text-bg-light">
          {role}
        </span>
      </td>
      <td>
        <span className={status == "Online" ? "badge text-bg-dark" : "badge text-bg-light"}>
          <span className="me-1">{status == "Online" ? <BiSolidCoffee /> : <BiCoffee />}</span>
          {status}
        </span>
      </td>
      <td>{loggedIn}</td>
      <td>{loggedOut}</td>
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

export default EmployeesTable