/* eslint-disable react-hooks/exhaustive-deps */
import { TableHeaders, TablePagination, TableStatus } from "../common"
import { isEntitySelected, toDateTime, toPcs, toPeso, truncate } from "../../util/helper.js"
import { isEmpty, isNil, size } from "lodash"
import { PaymentMethod, OrderStatus, GenericMessage, Fallback } from "../../util/classes/index.js"
import { useDispatch, useSelector } from "react-redux"
import { setSale, setSq } from "../redux/salesSlice.js"
import { Fragment, useContext } from "react"
import { Link } from "react-router-dom"
import { nextPage, previousPage } from "../redux/employeesSlice.js"
import { SalesContext } from "./SalesProvider.jsx"

const columns = ["Ref. Number", "Amount Due", "Total Items", "Order Status", "Payment Method", "Customer", "Salesperson", "Commission", "Date Ordered"]
const colSpan = size(columns)

function SalesTable() {
  const dispatch = useDispatch()
  const { sq } = useSelector((state) => state.sales)
  
  const { isLoading, isFetching, data, error } = useContext(SalesContext)
  const meta = Fallback.checkMeta(data)

  const handleChange = (e) => {
    dispatch(setSq(e))
  }
  const handlePrevious = () => {
    dispatch(previousPage())
  }
  const handleNext = (meta) => {
    dispatch(nextPage(meta))
  }

  return (
    <Fragment>
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
function TableContent({sq, data, error, isFetching}) {
  const dispatch = useDispatch()
  const { sale } = useSelector((state) => state.sales)

  const handleSelect = (sale) => {
    dispatch(setSale(sale))
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
                message={GenericMessage.SALES_FETCHING} 
              />
            ) : error ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.SALES_ERROR} 
              />
            )  : isEmpty(data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.SALES_EMPTY} 
              />
            ) : data.map((item, index) => (
              <TableItem 
                key={index} 
                item={item}
                isSelected={isEntitySelected(sale, item)}
                onSelect={() => handleSelect(item)}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
function TableItem({item, isSelected, onSelect}) {
  const refNumber = truncate(item.reference_number, 15)
  const amountDue = toPeso(item.amount_due)
  const totalItems = toPcs(item.number_of_items)
  const status = OrderStatus.toObject(item.status)
  const paymentMethod = PaymentMethod.toMethod(item.payment_method)
  const customer = truncate(item.customer?.full_name)
  const salesperson = truncate(item.employee.full_name)
  const commission = toPeso(item.commission)
  const dateCreated = toDateTime(item.created_at)

  return (
    <tr className={`${isSelected ? "is-selected" : ""}`}>
      <td>
        <Link onClick={onSelect}>
          {refNumber}
        </Link>
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
      <td>{commission}</td>
      <td>{dateCreated}</td>
    </tr>
  )
}
export default SalesTable