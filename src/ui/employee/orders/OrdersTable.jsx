/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { DELAY_MILLIS, orderStatuses } from "../../../util/Config.jsx"
import { toDateTime, toItems, toPeso, truncate } from "../../../util/helper.js"
import { SelectInput, TableHeaders, TablePagination, TableStatus } from "../../common"
import { Fragment, useCallback, useEffect, useState } from "react"
import SearchFieldInput from "../../common/inputs/SearchFieldInput.jsx"
import PaymentMethod from "../../../util/classes/PaymentMethod.js"
import OrderStatus from "../../../util/classes/OrderStatus.js"
import { nextPage, previousPage, setSq } from "../../redux/ordersSlice.js"
import { debounce, isEmpty, isNil, size } from "lodash"
import { useFetchOrdersQuery } from "../../../data/services/orders.js"
import Fallback from "../../../util/classes/Fallback.js"

const columns = ["Ref. Number", "Amount Due", "Total Items", "Status", "Payment Method", "Customer", "Salesperson", "Date Ordered"]
const colSpan = size(columns)

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
      <TableFiltering 
        name={sq.name}
        status={sq.status}
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
function TableFiltering({name, status, onChange}) {
  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            name="name"
            placeholder="Search by Order..."
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="col-6">
          <SelectInput
            name="status"
            options={orderStatuses}
            isOptional
            value={status}
            onChange={onChange}
            onRender={(option) => OrderStatus.toStatus(option)}
          />
        </div>
      </div>
    </div>
  )
}
function TableContent({sq, data, error, isFetching}) {
  return (
    <div className="table-wrapper table-container">
      <table className="table">
        <TableHeaders columns={columns} />
        <tbody>
          {
            isFetching ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.ORDERS_FETCHING} 
              />
            ) : error ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.ORDERS_ERROR} 
              />
            ) : isEmpty(data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.ORDERS_EMPTY} 
              />
            ) : data.map((item, index) => (
              <TableItem key={index} item={item} />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
function TableItem({item}) {
  const ref = truncate(item.reference_number)
  const customer = truncate(item.customer.full_name)
  const amountDue = toPeso(item.amount_due)
  const totalItems = toItems(item.number_of_items)
  const status = OrderStatus.toObject(item.status)
  const paymentMethod = PaymentMethod.toMethod(item.payment_method)
  const salesperson = truncate(item.employee.full_name)
  const dateCreated = toDateTime(item.created_at)

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
    </tr>
  )
}

export default OrdersTable