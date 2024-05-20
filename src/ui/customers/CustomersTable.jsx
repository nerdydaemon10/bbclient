/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { debounce, delay, isNil } from "lodash"
import { BiPlusCircle } from "react-icons/bi"
import { Fragment, useCallback, useEffect, useState } from "react"

import { ModalType } from "../../util/classes"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { Button, SearchFieldInput, TablePagination } from "../common"
import { openModal, setCustomer, setSq } from "../redux/customersSlice.js"
import { useFetchCustomersQuery } from "../../data/services/customers.js"
import { nextPage, previousPage } from "../redux/customersSlice.js"
import { Table } from "../common/Table.jsx"
import { checkMeta } from "../../util/helper.js"

function CustomersTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.customers)
  const [sqtemp, setSqtemp] = useState(sq)

  const { isLoading, isFetching, data, error } = useFetchCustomersQuery(sqtemp)
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
    <div className="table-filter d-flex gap-2">
      <SearchFieldInput
        name="search"
        value={search}
        onChange={onChange}
        placeholder="Search by Customer..."
      />
      <Button variant="light" onClick={handleClick}>
        <BiPlusCircle className="me-1" />
        Create Customer
      </Button>
    </div>
  )
}
function TableData({sq, data, error, isFetching}) {
  const dispatch = useDispatch()

  const handleUpdate = (customer) => {
    dispatch(setCustomer(customer))
    delay(() => dispatch(openModal(ModalType.UPDATE)), DELAY_MILLIS)
  }

  const handleRemove = (customer) => {
    dispatch(setCustomer(customer))
    delay(() => dispatch(openModal(ModalType.REMOVE)), DELAY_MILLIS)
  }

  const columns = [
    {
      name: "Full Name",
      accessor: "full_name",
      type:"string",
      format: "string",
      sortable: true
    },
    {
      name: "Address",
      accessor: "address",
      type:"string",
      format: "string",
      sortable: true
    },
    {
      name: "Phone Number",
      accessor: "phone_number",
      type:"string",
      format: "string",
      sortable: true
    },
    {
      name: "Email Address",
      accessor: "email_address",
      type:"string",
      format: "string",
      sortable: true
    },
    { 
      name: "Date Created",
      accessor: "created_at",
      type:"datetime",
      format: "datetime",
      sortable: true
    },
    {
      name: "Date Modified",
      accessor: "updated_at",
      type:"datetime",
      format: "datetime",
      sortable: true
    },
    {
      name: "Action",
      render: (item) => (
        <ActionRenderer 
          onUpdate={() => handleUpdate(item)} 
          onRemove={() => handleRemove(item)} 
        />
      )
    },
  ]

  return (
    <div className="table-wrapper table-data">
      <Table
        name="customers" 
        columns={columns}
        sq={sq}
        data={data}
        error={error}
        isFetching={isFetching}
      />
    </div>
  )
}
function ActionRenderer({onUpdate, onRemove}) {
  return (
    <div className="hstack gap-1">
      <Button variant="dark" size="sm" onClick={onUpdate}>
        Update
      </Button>
      <Button variant="light" size="sm" onClick={onRemove}>
        Remove
      </Button>
    </div>
  )
}
export default CustomersTable