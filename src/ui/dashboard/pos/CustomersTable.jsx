/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { DELAY_MILLIS } from "../../../util/Config.jsx"
import { Button, SearchFieldInput, TablePagination } from "../../common"
import { Fragment, useCallback, useEffect, useState } from "react"
import { nextPage, previousPage, selectSq, setCustomer, setSq } from "../../redux/posSlice.js"
import { debounce, isNil } from "lodash"
import Fallback from "../../../util/classes/Fallback.js"
import { Table } from "../../common/Table.jsx"
import { compareEntity } from "../../../util/helper.js"
import { useFetchCustomersQuery } from "../../../data/services/customers.js"

function CustomersTable() {
  const dispatch = useDispatch()

  const sq = useSelector((state) => selectSq(state.pos))
  const [sqtemp, setSqtemp] = useState(sq)
  
  const { data, error, isLoading, isFetching } = useFetchCustomersQuery(sqtemp)
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
  return (
    <div className="table-filter">
      <SearchFieldInput
        name="search"
        placeholder="Search by Customer..."
        value={search}
        onChange={onChange}
      />
    </div>
  )
}
function TableData({sq, data, error, isFetching}) {
  const dispatch = useDispatch()
  const { customer } = useSelector((state) => state.pos)

  const handleClick = (customer) => {
    dispatch(setCustomer(customer))
  }
  
  const columns = [
    {
      name: "Full Name",
      accessor: "full_name",
      type:"string",
      sortable: true
    },
    {
      name: "Address",
      accessor: "address",
      type:"string",
      sortable: true
    },
    {
      name: "Phone Number",
      accessor: "phone_number",
      type:"string",
      sortable: true
    },
    {
      name: "Email Address",
      accessor: "email_address",
      type:"string",
      sortable: true
    },
    {
      name: "Action",
      render: (item) => (
        <Button
          variant={compareEntity(item, customer) ? "outline-dark" : "dark"}
          size="sm"
          onClick={() => handleClick(item)}
        >
          {compareEntity(item, customer) ? "Remove" : "Choose" }
        </Button>
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

export default CustomersTable