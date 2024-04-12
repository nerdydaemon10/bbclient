import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import AppSelect from "../../components/inputs/AppSelect.jsx"
import { rowsPerPages } from "../../../utils/Config.jsx"

function PaginationContainer({meta, currentPage, rowsPerPage, onChange, onPrevious, onNext}) {
  return (
    <div className="pagination-container">
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <AppSelect
          name="rowsPerPage"
          options={rowsPerPages}
          disabled={meta.total == 0}
          value={rowsPerPage}
          onChange={onChange}
        />
      </div>
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Page {currentPage} of {meta.last_page}</label>
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

export default PaginationContainer