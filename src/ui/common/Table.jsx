import { get, isEmpty, isNil, orderBy, size } from "lodash"
import { rowsPerPages } from "../../util/Config.jsx"
import Button from "./buttons/Button.jsx"
import SelectInput from "./inputs/SelectInput.jsx"
import { BiSortAZ, BiSortZA } from "react-icons/bi"
import moment from "moment"
import { useEffect, useState } from "react"
import { toCount, toDate, toDateTime, toItems, toPeso, toStocks, truncate } from "../../util/helper.js"

export function Table({name, columns, data, error, sq, selected, isFetching}) {
  const colSpan = size(columns)
  const [accessor, setAccessor] = useState("")
  const [isAsc, setIsAsc] = useState(false)
  const [dt, setDt] = useState([])

  const handleSort = (col) => {
    if (isNil(col.type)) return
    if (accessor == col.accessor) setIsAsc(!isAsc)
    if (accessor != col.accessor) setIsAsc(true)
    setAccessor(col.accessor)
    setDt(orderBy(data, [(item) => tranform(item, col)], [isAsc ? "desc" : "asc"]))
  }

  const tranform = (item, col) => {
    const value = isNil(item.alias) ? get(item, col.accessor) : item.alias(item)

    if (isNil(col.type)) return value
    if (col.type == "number") return Number(value)
    if (col.type == "string") return value
    if (col.type == "date") return moment(value).format("X")
    if (col.type == "datetime") return moment(value).format("X")
      
    return value
  }

  const hasRenderer = (column) => {
    return !isNil(column.render) || isNil(column.accessor)
  }

  const hasEmptyResults = (data, sq) => {
    if (isNil(sq)) return false

    const excludes = ["per_page", "page"]
    const entries = Object
      .entries(sq)
      .filter((entry) => !excludes.includes(entry[0]))
    
    if (!data)
      return false
  
    if (data.length > 0)
      return false
  
    const hasValues = entries.some((item) => !isEmpty(item[1]))
  
    return isEmpty(data) && hasValues
  }

  useEffect(() => {
    setDt(data)
  }, [data])
  
  const render = (item, col) => {
    const value = get(item, col.accessor)

    if (isNil(col.format)) return value
    if (col.format == "string") return truncate(value)
    if (col.format == "stocks") return toStocks(value)
    if (col.format == "items") return toItems(value)
    if (col.format == "count") return toCount(value)
    if (col.format == "currency") return toPeso(value)
    if (col.format == "date") return toDate(value)
    if (col.format == "datetime") return toDateTime(value)

    return value
  }

  return (
    <table className="table">
      <thead>
        <tr>
        {columns.map((col, colIndex) => (
          <th key={colIndex} className={col.accessor == accessor && isAsc ? "is-sorted" : ""}>
            {col.name}
            {
              col.sortable && (
                <a 
                  className={`ms-1 color-reset table-sorter`}
                  type="button"
                  onClick={() => handleSort(col)}
                >
                  {col.accessor == accessor && isAsc ? <BiSortAZ /> : <BiSortZA />}
                </a>
              )
            }
          </th>
        ))}
        </tr>
      </thead>
      <tbody>
        {
          isFetching ? (
            <TableStatus 
              colSpan={colSpan} 
              message={`Fetching ${name}... please wait for a while.`} 
            />
          ) : error ? (
            <TableStatus 
              colSpan={colSpan} 
              message={`Something went wrong while fetching ${name}.`}
            />
          ) : hasEmptyResults(data, sq) ? (
            <TableStatus 
              colSpan={colSpan} 
              message={`No ${name} match your search criteria. Try refining your search.`}
            />
          ) : isEmpty(data) ? (
            <TableStatus 
              colSpan={colSpan} 
              message={`No ${name} in our records yet.`}
            />
          ) : dt.map((item, itemIndex) => (
            <tr key={itemIndex} className={selected?.id == item.id ? "is-selected" : ""}>
              {
                columns.map((col, colIndex) => 
                  hasRenderer(col)
                  ? (<td key={colIndex}>{col.render(item)}</td>)
                  : (<td key={colIndex}>{render(item, col)}</td>)
                )
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
function TableStatus({colSpan, message}) {
  return (
    <tr>
      <td className="table-status" colSpan={colSpan}>
        {message}
      </td>
    </tr>
  )
}
export function TablePagination({className, meta, rowsPerPage, isFetching, onChange, onPrevious, onNext}) {
  const { current_page, last_page } = meta
  
  return (
    <div className={`table-pagination d-flex align-items-center justify-content-between ${className}`}>
      <div className="d-flex flex-row align-items-center gap-2">
        <label className="fw-medium fs-7 text-nowrap">Rows per page</label>
        <SelectInput
          name="per_page"
          options={rowsPerPages}
          value={rowsPerPage}
          onChange={onChange}
          onRender={(option) => `${option} rows`}
        />
      </div>
      <div className="d-flex flex-row align-items-center gap-2">
        <label className="fw-medium fs-7 text-nowrap">{`Page ${current_page} of ${last_page}`}</label>
        <div className="btn-group">
          <Button
            variant="light" 
            isDisabled={isFetching || current_page <= 1}
            onClick={onPrevious}
          >
            Prev
          </Button>
          <Button 
            variant="light" 
            isDisabled={isFetching || current_page >= last_page} 
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}