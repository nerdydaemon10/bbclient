import { isEmpty, isNil, orderBy, size, sortBy, truncate } from "lodash"
import { rowsPerPages } from "../../util/Config.jsx"
import Button from "./buttons/Button.jsx"
import SelectInput from "./inputs/SelectInput.jsx"
import { BiSort } from "react-icons/bi"
import moment from "moment"
import { useEffect, useState } from "react"

/*columns = [
  {
    name: "Full Name",
    accessor: "full_name",
    type: "string",
    sortable: true,
    render: (item) => {}
  }
]*/

export function Table({name, columns, data, error, sq, isFetching}) {
  const colSpan = size(columns)
  const [accessor, setAccessor] = useState("")
  const [isAsc, setIsAsc] = useState(false)
  const [dt, setDt] = useState([])

  const handleSort = (col) => {
    if (isNil(col.type)) return
    if (accessor == col.accessor) setIsAsc(!isAsc)
    if (accessor != col.accessor) setIsAsc(true)
    setAccessor(col.accessor)
    setDt(orderBy(data, [(item) => tranform(item, col)], [isAsc ? "asc" : "desc"]))
  }

  const tranform = (item, col) => {
    if (col.type == "string")
      return item[col.accessor]
    if (col.type == "date")
      return moment(item[col.accessor]).format("X")
    if (col.type == "datetime") {
      return moment(item[col.accessor]).format("X")
    }
    return item[col.accessor]
  }

  const hasRenderer = (column) => {
    return !isNil(column.render) || isNil(column.accessor)
  }

  const hasEmptyResults = (data, sq) => {
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
    if (isNil(col.type))
      return item[col.accessor]
    if (col.type == "string")
      return truncate(item[col.accessor], { length: 24 })
    if (col.type == "date")
      //return moment(item[col.accessor]).format("YYYY-MM-DD")
      return moment(item[col.accessor]).format("MMM, DD YYYY")
    if (col.type == "datetime")
      //return moment(item[col.accessor]).format("YYYY-MM-DD, h:mm:ss a")
      return moment(item[col.accessor]).format("MMM, DD YYYY, h:mm a")
    return item[col.accessor]
  }

  return (
    <table className="table">
      <thead>
        <tr>
        {columns.map((col, colIndex) => (
          <th className={col.accessor == accessor && isAsc ? "is-sorted" : ""} key={colIndex}>
            {col.name}
            {
              col.sortable && (
                <a 
                  className={`ms-1 color-reset table-sorter`}
                  type="button"
                  onClick={() => handleSort(col)}>
                  <BiSort />
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
            <tr key={itemIndex}>
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

export function TableHeaders({columns}) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th key={index}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  )
}
export function TableStatus({colSpan, message}) {
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
    <div className={`table-pagination-container d-flex align-items-center justify-content-between ${className}`}>
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