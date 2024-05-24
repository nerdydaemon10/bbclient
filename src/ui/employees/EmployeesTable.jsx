/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { debounce, delay, isNil } from "lodash"

import { ModalType, Role, Status } from "../../util/classes"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { BiDotsVertical, BiPlusCircle, BiSolidCheckCircle } from "react-icons/bi"
import { useFetchEmployeesQuery } from "../../data/services/employees.js"
import { Button, TablePagination, SearchFieldInput } from "../common"
import { nextPage, openModal, previousPage, setEmployee, setSq } from "../redux/employeesSlice.js"
import { Table } from "../common/Table.jsx"
import { checkMeta, checkUser, compareEntity, truncate } from "../../util/helper.js"
import secureLocalStorage from "react-secure-storage"

function EmployeesTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.employees)
  const [sqtemp, setSqtemp] = useState(sq)

  const { isLoading, isFetching, data, error } = useFetchEmployeesQuery(sqtemp)
  const meta = checkMeta(data)
  
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
      <TableFilter
        search={sq.search}
        onChange={handleChange}
      />
      <TableData
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
function TableFilter({search, onChange}) {
  const dispatch = useDispatch()
  
  const handleClick = () => {
    dispatch(openModal(ModalType.CREATE))
  }

  return (
    <div className="table-filter d-flex align-items-center gap-1">
      <SearchFieldInput
        placeholder="Search by Employee..."
        name="search"
        value={search}
        onChange={onChange}
      />
      <span className="text-body-secondary">
        <BiDotsVertical />
      </span>
      <Button variant="outline-dark" onClick={handleClick}>
        <BiPlusCircle className="me-1" />
        Create Employee
      </Button>
    </div>
  )
}
function TableData({sq, data, error, isFetching}) {
  const dispatch = useDispatch()

  const user = checkUser(secureLocalStorage.getItem("user"))

  const handleUpdate = (employee) => {
    dispatch(setEmployee(employee))
    delay(() => dispatch(openModal(ModalType.UPDATE)), DELAY_MILLIS)
  }
  const handleRemove = (employee) => {
    dispatch(setEmployee(employee))
    delay(() => dispatch(openModal(ModalType.REMOVE)), DELAY_MILLIS)
  }

  const columns = [
    {
      name: "Full Name",
      accessor: "full_name",
      type:"string",
      format: "string",
      sortable: true,
      render: (item) => <FullNameRenderer item={item} user={user} />
    },
    {
      name: "Username",
      accessor: "username",
      type:"string",
      sortable: true,
      render: (item) => `@${item.username}`
    },
    {
      name: "Role",
      accessor: "role_id",
      type:"string",
      sortable: true,
      render: (item) => <RoleRenderer item={item} />
    },
    {
      name: "Status",
      accessor: "status",
      type:"string",
      sortable: true,
      render: (item) => <StatusRenderer item={item} /> 
    },
    { 
      name: "Date/Logged In",
      accessor: "last_login_at",
      type:"datetime",
      format: "datetime",
      sortable: true
    },
    {
      name: "Date/Logged Out",
      accessor: "last_logout_at",
      type:"datetime",
      format: "datetime",
      sortable: true
    },
    {
      name: "Action",
      render: (item) => (
        <ActionRenderer 
          item={item} 
          onUpdate={() => handleUpdate(item)} 
          onRemove={() => handleRemove(item)} 
        />
      )
    },
  ]

  return (
    <div className="table-wrapper table-data">
      <Table
        name="employees" 
        columns={columns}
        sq={sq}
        data={data}
        error={error}
        isFetching={isFetching}
      />
    </div>
  )
}
function FullNameRenderer({item, user}) {  
  const fullName = truncate(item.full_name)

  return (
    <Fragment>
      {fullName}
      {compareEntity(item, user) && <span className="ms-1">(Me)</span>}
      {Role.isAdmin(item.role_id) && <span className="ms-1"><BiSolidCheckCircle/></span>}
    </Fragment>
  )
}
function RoleRenderer({item}) {
  const role = Role.toNormalize(item.role_id)
  return (
    <span className="badge text-bg-light">
      {role}
    </span>
  )
}
function StatusRenderer({item}) {
  const status =  Status.toObject(item.status)
  
  return (
    <span className={`badge ${status.badge}`}>
      <span className="me-1">{status.icon}</span>
      {status.name}
    </span>
  )
}
function ActionRenderer({item, onUpdate, onRemove}) {
  const role = Role.toNormalize(item.role_id)
  const isAdmin = Role.isAdmin(role)

  return (
    <div className="hstack gap-1">
      <Button 
        variant="dark" 
        size="sm" 
        isDisabled={isAdmin}
        onClick={onUpdate}
      >
        Update
      </Button>
      <Button 
        variant="light" 
        size="sm"
        isDisabled={isAdmin}
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  )
}

export default EmployeesTable