/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { DELAY_MILLIS } from "../../../util/Config.jsx"
import { toDate, toPcs, toPeso } from "../../../util/helper.js"
import { Button, TablePagination } from "../../common/index.jsx"
import SearchFieldInput from "../../common/inputs/SearchFieldInput.jsx"
import PaymentMethod from "../../../util/classes/PaymentMethod.js"
import { BiBlock, BiCheck } from "react-icons/bi"
import OrderStatus from "../../../util/classes/OrderStatus.js"
import { nextPage, openModal, previousPage, setOrder, setSq } from "../../redux/ordersSlice.js"
import { debounce, delay, isNil, truncate } from "lodash"
import ModalType from "../../../util/classes/ModalType.js"
import { Fragment, useCallback, useEffect, useState } from "react"
import { useFetchOrdersQuery } from "../../../data/services/orders.js"
import Fallback from "../../../util/classes/Fallback.js"
import { Table } from "../../common/Table.jsx"
import { Link } from "react-router-dom"

function OrdersTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.orders)
  const [sqtemp, setSqtemp] = useState(sq)

  const { isLoading, isFetching, data, error } = useFetchOrdersQuery(sqtemp)
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
  }, [debouncer, sq])

  return (
    <Fragment>
      <TableFilter 
        search={sq.search}
        status={sq.status}
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
    <div className="table-filter d-flex">
      <SearchFieldInput
        name="search"
        placeholder="Search by Order..."
        value={search}
        onChange={onChange}
      />
    </div>
  )
}
function TableData({sq, data, error, isFetching}) {
  const dispatch = useDispatch()

  const handleApprove = (order) => {
    dispatch(setOrder(order))
    delay(() => dispatch(openModal(ModalType.APPROVE)), DELAY_MILLIS)
  }

  const handleReject = (order) => {
    dispatch(setOrder(order))
    delay(() => dispatch(openModal(ModalType.REJECT)), DELAY_MILLIS)
  }

  const columns = [
    {
      name: "Ref. Number",
      accessor: "reference_number",
      type: "string",
      format: "string",
      sortable: true,
      render: (item) => <RefNumberRenderer item={item} />
    },
    {
      name: "Customer",
      accessor: "customer.full_name",
      type: "string",
      format: "string",
      sortable: true
    },
    {
      name: "Amount Due",
      accessor: "amount_due",
      type: "number",
      format: "currency",
      sortable: true
    },
    {
      name: "Total Items",
      accessor: "number_of_items",
      type: "number",
      format: "pcs",
      sortable: true
    },
    {
      name: "Status",
      accessor: "status",
      type: "string",
      sortable: true,
      render: (item) => <StatusRenderer item={item} />
    },
    {
      name: "Payment Method",
      accessor: "payment_method",
      type: "number",
      sortable: true,
      render: (item) => <PaymentMethodRenderer item={item} />
    },
    {
      name: "Salesperson",
      accessor: "employee.full_name",
      type: "string",
      format: "string",
      sortable: true
    },
    {
      name: "Date Ordered",
      accessor: "created_at",
      type: "datetime",
      format: "datetime",
      sortable: true
    },
    {
      name: "Action",
      render: (item) => (
        <ActionRenderer 
          onApprove={() => handleApprove(item)} 
          onReject={() => handleReject(item)} 
        />
      )
    }
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

function TableItem({item, onApprove, onReject}) {
  const ref = truncate(item.reference_number)
  const customer = truncate(item.customer.full_name)
  const amountDue = toPeso(item.amount_due)
  const totalItems = toPcs(item.number_of_items)
  const status = OrderStatus.toObject(item.status)
  const paymentMethod = PaymentMethod.toMethod(item.payment_method)
  const salesperson = truncate(item.employee.full_name)
  const dateCreated = toDate(item.created_at)

  return (
    <tr>
      <td>
        <a href="#">
          {ref}
        </a>
      </td>
      <td>{amountDue}</td>
      <td>{totalItems}</td>
      <td>
        <span className={`badge ${status.badge}`}>
          {status.icon}
          {status.name}
        </span>
      </td>
      <td>
        <span className="badge text-bg-light">
          {paymentMethod}
        </span>
      </td>
      <td>{customer}</td>
      <td>{salesperson}</td>
      <td>{dateCreated}</td>
      <td className="hstack gap-1">
        <Button
          variant="dark" 
          size="sm"
          onClick={onApprove}
        >
          <BiCheck 
            className="me-1" 
          />
          Approve
        </Button>
        <Button
          variant="light" 
          size="sm"
          onClick={onReject}
        >
          <BiBlock className="me-1" />
          Reject
        </Button>
      </td>
    </tr>
  )
}

function RefNumberRenderer({item}) {
  const refNumber = truncate(item.reference_number)

  return (
    <Link>{refNumber}</Link>
  )
}
function StatusRenderer({item}) {
  const status = OrderStatus.toObject(item.status)

  return (
    <span className={`badge ${status.badge}`}>
      {status.icon}
      {status.name}
    </span>
  )
}
function PaymentMethodRenderer({item}) {
  const paymentMethod = PaymentMethod.toMethod(item.payment_method)

  return (
    <span className="badge text-bg-light">
      {paymentMethod}
    </span>
  )
}
function ActionRenderer({onApprove, onReject}) {
  return (
    <span className="hstack gap-1">
      <Button
        variant="dark" 
        size="sm"
        onClick={onApprove}
      >
        <BiCheck 
          className="me-1" 
        />
        Approve
      </Button>
      <Button
        variant="light" 
        size="sm"
        onClick={onReject}
      >
        <BiBlock className="me-1" />
        Reject
      </Button>
    </span>
  )
}

export default OrdersTable