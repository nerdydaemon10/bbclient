import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import AppSelect from "../../../../components/inputs/AppSelect.jsx"
import RowsPerPages from "../../../../utils/configs/RowsPerPages.jsx"

function PosPaginationContainer({meta, currentPage, rowsPerPage, onChange, onPrevious, onNext}) {
  return (
    <div className="pos-pagination-container d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <AppSelect
          options={RowsPerPages}
          disabled={meta.total == 0}
          value={rowsPerPage}
          onChange={onChange}
        />
      </div>
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Page {meta.current_page} of {meta.last_page}</label>
        <div className="btn-group">
          <button 
            className="btn btn-secondary" 
            disabled={currentPage <= 1}
            onClick={onPrevious}
          >
            <BiChevronLeft size={18} />
          </button>
          <button 
            className="btn btn-secondary" 
            disabled={currentPage >= meta.last_page}
            onClick={onNext}
          >
            <BiChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PosPaginationContainer