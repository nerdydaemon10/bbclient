/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { DELAY_MILLIS } from "../../../util/Config.jsx"
import { TablePagination } from "../../common/index.jsx"
import PaymentMethod from "../../../util/classes/PaymentMethod.js"
import OrderStatus from "../../../util/classes/OrderStatus.js"
import { nextPage, previousPage, setOrder, setSq } from "../../redux/ordersSlice.js"
import { debounce, isNil, size } from "lodash"
import { useCallback, useEffect, useState } from "react"
import { useFetchOrdersQuery } from "../../../data/services/orders.js"
import { Table } from "../../common/Table.jsx"
import { Link } from "react-router-dom"
import { checkMeta, computeQty, toItems, toQty, truncate } from "../../../util/helper.js"

function OrdersTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.orders)
  const [sqtemp, setSqtemp] = useState(sq)

  const { isLoading, isFetching, data, error } = useFetchOrdersQuery(sqtemp)
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
  }, [debouncer, sq])

  return (
    <div className="orders-table d-grid gap-2">
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
    </div>
  )
}
function TableData({sq, data, error, isFetching}) {
  const { viewOrder } = useSelector((state) => state.orders)

  const dispatch = useDispatch()

  const handleSelect = (order) => {
    dispatch(setOrder({type: "view", order}))
  }

  const columns = [
    {
      name: "Ref. Number",
      accessor: "reference_number",
      type: "string",
      format: "string",
      sortable: true,
      render: (item) => <RefNumberRenderer item={item} onSelect={() => handleSelect(item)} />
    },
    {
      name: "Customer",
      accessor: "customer.full_name",
      type: "string",
      format: "string",
      sortable: true
    },
    {
      name: "Total",
      accessor: "amount_due",
      type: "number",
      format: "currency",
      sortable: true
    },
    {
      name: "Items/Qty",
      type: "number",
      sortable: true,
      alias: (item) => itemsQtyAliaser(item), 
      render: (item) => <TotalItemsQtyRenderer item={item} />
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
      name: "Salesp. Commission",
      accessor: "commission",
      type: "number",
      format: "currency",
      sortable: true
    },
    {
      name: "Date Ordered",
      accessor: "created_at",
      type: "date",
      format: "date",
      sortable: true
    }
  ]
  
  return (
    <div className="table-wrapper table-data">
      <Table
        name="orders" 
        columns={columns}
        sq={sq}
        data={data}
        error={error}
        selected={viewOrder}
        isFetching={isFetching}
      />
    </div>
  )
}
function RefNumberRenderer({item, onSelect}) {
  const refNumber = truncate(item.reference_number)

  return (
    <Link onClick={onSelect}>{refNumber}</Link>
  )
}
function itemsQtyAliaser(item) {
  const items = size(item.checkouts)
  const qty = computeQty(item.checkouts)

  return items + qty
}
function TotalItemsQtyRenderer({item}) {
  const items = toItems(size(item.checkouts))
  const qty = toQty(computeQty(item.checkouts))

  return `${items}/${qty}`
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

export default OrdersTable