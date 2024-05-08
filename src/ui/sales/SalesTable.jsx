/* eslint-disable react-hooks/exhaustive-deps */
import { BiLinkAlt } from "react-icons/bi"
import { TableHeaders, TablePagination, TableStatus } from "../common"
import { isEntitySelected, noSearchResults } from "../../util/helper.jsx"
import { debounce, isEmpty, isNil, size } from "lodash"
import StringHelper from "../../util/helpers/StringHelper.js"
import { PaymentMethod, OrderStatus, GenericMessage, Fallback } from "../../util/classes/index.js"
import DateHelper from "../../util/helpers/DateHelper.js"
import { useDispatch, useSelector } from "react-redux"
import { setSale, setSq } from "../redux/salesSlice.js"
import { Fragment, useCallback, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { useFetchSalesQuery } from "../../data/services/sales.js"
import { nextPage, previousPage } from "../redux/employeesSlice.js"
import { SalesContext } from "./SalesProvider.jsx"

const columns = ["Ref. Number", "Amount Due", "Total Items", "Order Status", "Payment Method", "Customer", "Salesperson", "Commission", "Date Ordered"]
const colSpan = size(columns)

function SalesTable() {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.sales)
  //const [sqtemp, setSqtemp] = useState(sq)

  /*const debouncer = useCallback(debounce((sqtemp) => {
    setSqtemp(sqtemp)
  }, DELAY_MILLIS), [])*/

  const { isLoading, isFetching, data, error } = useContext(SalesContext)
  //const { isLoading, isFetching, data, error } = useFetchSalesQuery(sqtemp)
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

  /*useEffect(() => {
    debouncer(sq)
  }, [sq])*/

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
            ) : noSearchResults(sq, data) ? (
              <TableStatus 
                colSpan={colSpan} 
                message={GenericMessage.SALES_NO_MATCH} 
              />
            ) : isEmpty(data) ? (
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
  const refNumber = StringHelper.truncate(item.reference_number, 15)
  const amountDue = StringHelper.toPesoCurrency(item.amount_due)
  const totalItems = StringHelper.toPcs(item.number_of_items)
  const status = OrderStatus.toObject(item.status)
  const paymentMethod = PaymentMethod.toMethod(item.payment_method)
  const customer = StringHelper.truncate(item.customer?.full_name)
  const salesperson = StringHelper.truncate(item.employee.full_name)
  const commission = StringHelper.toPesoCurrency(item.commission)
  const dateCreated = DateHelper.toIsoStandard(item.created_at)

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