/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { debounce, delay, isEmpty, isNil, size } from "lodash"

import { Fallback, GenericMessage, ModalType, Role, User } from "../../util/classes"
import { StringHelper, DateHelper } from "../../util/helpers"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { BiPlusCircle, BiSolidCheckCircle } from "react-icons/bi"
import { isEntitySelected, noSearchResults } from "../../util/helper.jsx"
import { useFetchEmployeesQuery } from "../../data/services/employees.js"
import { Button, TablePagination, TableStatus, SearchFieldInput, TableHeaders } from "../common"
import { nextPage, openModal, previousPage, setEmployee, setSq } from "../redux/employeesSlice.js"
import { local } from "../../util"

const columns = ["Full Name", "Username", "Role", "Status", "Date/Logged In", "Date/Logged Out", "Action"]
const colSpan = size(columns)

function EmployeesTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.employees)
  const [sqtemp, setSqtemp] = useState(sq)

  const { isLoading, isFetching, data, error } = useFetchEmployeesQuery(sqtemp)
  const meta = Fallback.checkMeta(data)
  
  const debouncer = useCallback(debounce((sqtemp) => {
    setSqtemp(sqtemp)
  }, DELAY_MILLIS), [])
  
  const handleChange = (e) => {
    dispatch(setSq(e))
  }
  const handlePrevious = () => {
    dispatch(previousPage())
  }
  const handleNext = (meta) => {
    dispatch(nextPage(meta))
  }

  useEffect(() => {
    debouncer(sq)
  }, [sq])
  
  return (
    <Fragment>
      <TableFiltering 
        search={sq.search}
        onChange={handleChange}
      />
      <TableContent
        sq={sq}
        data={isNil(data) ? [] : data.data}
        error={error}
        isFetching={isLoading || isFetching}
      />
      <TablePagination 
        meta={meta}
        rowsPerPage={sq.per_page}
        isFetching={isLoading || isFetching}
        onChange={handleChange}
        onPrevious={handlePrevious}
        onNext={() => handleNext(meta)}
      />
    </Fragment>
  )
}
function TableFiltering({search, onChange}) {
  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(openModal(ModalType.CREATE))
  }

  return (
    <div className="table-filtering">
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
function TableContent({sq, data, error, isFetching}) {
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
    <div className="table-wrapper table-content">
      <table className="table">
        <TableHeaders columns={columns} />
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
            ) : data.map((item, index) => (
              <TableItem 
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
function TableItem({item, isUser, onUpdate, onRemove}) {
  const fullName = StringHelper.truncate(item.full_name)
  const username = `@${StringHelper.truncate(item.username)}`
  const role = Role.toRole(item.role_id)
  const isAdmin = Role.isAdmin(item.role_id)
  const status =  User.toObject(item.status)
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
        <span className={`badge ${status.badge}`}>
          <span className="me-1">{status.icon}</span>
          {status.name}
        </span>
      </td>
      <td>{loggedIn}</td>
      <td>{loggedOut}</td>
      <td className="hstack gap-1">
        <Button size="sm" onClick={onUpdate}>
          Update
        </Button>
        <Button variant="light" size="sm" isDisabled={isUser} onClick={onRemove}>
          Remove
        </Button>
      </td>
    </tr>
  )
}

export default EmployeesTable