/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import DateHelper from "../../../util/helpers/DateHelper.js"
import StringHelper from "../../../util/helpers/StringHelper.js"
import { DELAY_MILLIS, orderStatuses } from "../../../util/Config.jsx"
import { noSearchResults } from "../../../util/helper.jsx"
import { Button, SelectInput, TableHeaders, TablePagination, TableStatus } from "../../common"
import SearchFieldInput from "../../common/inputs/SearchFieldInput.jsx"
import PaymentMethod from "../../../util/classes/PaymentMethod.js"
import { BiBlock, BiCheck } from "react-icons/bi"
import OrderStatus from "../../../util/classes/OrderStatus.js"
import { nextPage, openModal, previousPage, setOrder, setSq } from "../../redux/ordersSlice.js"
import { debounce, delay, isEmpty, isNil, size } from "lodash"
import ModalType from "../../../util/classes/ModalType.js"
import { Fragment, useCallback, useEffect, useState } from "react"
import { useFetchOrdersQuery } from "../../../data/services/orders.js"
import local from "../../../util/local.js"
import Fallback from "../../../util/classes/Fallback.js"

const columns = ["Ref. Number", "Amount Due", "Total Items", "Status", "Payment Method", "Customer", "Salesperson", "Date Ordered", "Action"]
const colSpan = size(columns)

function OrdersTable() {
  const user = local.get("user")

  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.orders)
  const [sqtemp, setSqtemp] = useState(sq)

  const { isLoading, isFetching, data, error } = useFetchOrdersQuery(sqtemp, user.role)
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
        search={sq.search}
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
function TableFiltering({search, status, onChange}) {
  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-6">
          <SearchFieldInput
            name="search"
            placeholder="Search by Order..."
            value={search}
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
  const dispatch = useDispatch()

  const handleApprove = (order) => {
    dispatch(setOrder(order))
    delay(() => dispatch(openModal(ModalType.APPROVE)), DELAY_MILLIS)
  }

  const handleReject = (order) => {
    dispatch(setOrder(order))
    delay(() => dispatch(openModal(ModalType.REJECT)), DELAY_MILLIS)
  }

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
            ) : noSearchResults(sq, data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.ORDERS_NO_MATCH} 
              />
            ) : isEmpty(data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.ORDERS_EMPTY} 
              />
            ) : data.map((item, index) => (
              <TableItem 
                key={index} 
                item={item}
                onApprove={() => handleApprove(item)}
                onReject={() => handleReject(item)}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

function TableItem({item, onApprove, onReject}) {
  const ref = StringHelper.truncate(item.reference_number)
  const customer = StringHelper.truncate(item.customer.full_name)
  const amountDue = StringHelper.toPesoCurrency(item.amount_due)
  const totalItems = StringHelper.toPcs(item.number_of_items)
  const status = OrderStatus.toObject(item.status)
  const paymentMethod = PaymentMethod.toMethod(item.payment_method)
  const salesperson = StringHelper.truncate(item.employee.full_name)
  const dateCreated = DateHelper.toIsoStandard(item.created_at)

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

export default OrdersTable