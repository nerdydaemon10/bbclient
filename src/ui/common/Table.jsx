import { rowsPerPages } from "../../util/Config.jsx"
import Button from "./buttons/Button.jsx"
import SelectInput from "./inputs/SelectInput.jsx"

export function TablePagination({className, meta, rowsPerPage, isLoading, isFetching, onChange, onPrevious, onNext}) {
  const { current_page, last_page } = meta
  const isPending = isLoading || isFetching
  
  return (
    <div className={`table-pagination-container ${className}`}>
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
            isDisabled={isPending || current_page <= 1}
            onClick={onPrevious}
          >
            Prev
          </Button>
          <Button 
            variant="light" 
            isDisabled={isPending || current_page >= last_page} 
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}