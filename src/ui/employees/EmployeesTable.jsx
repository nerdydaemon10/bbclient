import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../util/classes/GenericMessage.js"
import { columns, columnsSize } from "./Util.jsx"
import StringHelper from "../../util/helpers/StringHelper.js"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { BiCoffee, BiPlug, BiPlusCircle, BiSolidCheckCircle, BiSolidCoffee, BiSolidPlug, BiSolidStar, BiStar } from "react-icons/bi"
import { isEntitySelected, noSearchResults } from "../../util/helper.jsx"
import { useCallback, useEffect, useState } from "react"
import ModalType from "../../util/classes/ModalType.js"
import SearchFieldInput from "../common/inputs/SearchFieldInput.jsx"
import { debounce, delay, isEmpty } from "lodash"
import { useFetchEmployeesQuery } from "../../data/services/employees.js"
import { isPending } from "@reduxjs/toolkit"
import { Button, TDStatus, THeaders, TablePagination } from "../common"
import Role from "../../util/classes/Role.js"
import { openModal, setEmployee, setSq } from "../redux/employeesSlice.js"
import DateHelper from "../../util/helpers/DateHelper.js"
import local from "../../util/local.js"

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
        isLoading={isLoading}
        isFetching={isFetching}
        searchQuery={sq}
        data={data}
        error={error}
      />
      <TablePagination 
        meta={meta}
        rowsPerPage={sq.per_page}
        isLoading={isLoading}
        isPending={isPending}
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
function TableContainer({isLoading, isFetching, searchQuery, data, error}) {
  const user = local.get("user")

  const dispatch = useDispatch()

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
            isLoading || isFetching ? (
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
            ) : data.data.map((employee, index) => (
              <Employee 
                key={index} 
                employee={employee} 
                isUser={isEntitySelected(employee, user)}
                onUpdate={() => handleUpdate(employee)}
                onRemove={() => handleRemove(employee)}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

function Employee({employee, isUser, onUpdate, onRemove}) {
  const fullName = StringHelper.truncate(employee.full_name)
  const username = `@${StringHelper.truncate(employee.username)}`
  const role = Role.toRole(employee.role_id)
  const isAdmin = Role.isAdmin(employee.role_id)
  const status = StringHelper.truncate(employee.status)
  const loggedIn = DateHelper.toDateTime(employee.last_logged_in)
  const loggedOut = DateHelper.toDateTime(employee.last_logged_out)

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