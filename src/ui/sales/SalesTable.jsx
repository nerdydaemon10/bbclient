/* eslint-disable react-hooks/exhaustive-deps */
import { Table, TablePagination } from "../common"
import { computeQty, toItems, toPeso, toQty, truncate } from "../../util/helper.js"
import { debounce, isNil, size } from "lodash"
import { PaymentMethod, OrderStatus, Fallback } from "../../util/classes/index.js"
import { useDispatch, useSelector } from "react-redux"
import { selectSale, selectSq, setSale, setSq } from "../redux/salesSlice.js"
import { Fragment, useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { nextPage, previousPage } from "../redux/employeesSlice.js"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { useFetchSalesQuery } from "../../data/services/sales.js"

function SalesTable() {
  const dispatch = useDispatch()

  const sq = useSelector(selectSq)
  const [sqtemp, setSqtemp] = useState(sq)

  const { isLoading, isFetching, data, error } = useFetchSalesQuery(sqtemp)
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
function TableData({sq, data, error, isFetching}) {
  const sale = useSelector(selectSale)

  const dispatch = useDispatch()

  const handleSelect = (order) => {
    dispatch(setSale(order))
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
      name: "Ordered By",
      accessor: "customer.full_name",
      type: "string",
      format: "string",
      sortable: true
    },
    {
      name: "Salesperson",
      accessor: "employee.full_name",
      type: "string",
      sortable: true,
      render: (item) => <SalespersonRenderer item={item} />
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
        name="sales" 
        columns={columns}
        sq={sq}
        data={data}
        error={error}
        selected={sale}
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
function SalespersonRenderer({item}) {
  const salesperson = truncate(item.employee.full_name)
  const commission = toPeso(item.commission)

  return (
    <div className="vstack">
      <span className="text-body-primary">{salesperson}</span>
      <span className="text-body-secondary">
        {commission} <span className="fs-10">(Commission)</span>
      </span>
    </div>
  )
}

export default SalesTable