import {  useSelector } from "react-redux"

import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import UiHelper from "../../../../utils/helpers/UiHelper.jsx"
import RowsPerPages from "../../../../utils/configs/RowsPerPages.jsx"

function InventoryPaginationSection() {
  const { status } = useSelector((state) => state.pos.products)
  const disabled = UiHelper.setDisabledByStatusCases(status, [UiStatus.LOADING, UiStatus.EMPTY, UiStatus.ERROR])
  
  return (
    <div className="inventory-pagination-section d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Rows per page</label>
        <select className="form-select" disabled={disabled}>
          {RowsPerPages.map((count, index) => (<option key={index} value={count}>{count} rows</option>))}
        </select>
      </div>
      <div className="d-flex align-items-center app-sx-8">
        <label className="app-text-label app-text-nowrap">Page 1 of 10</label>
        <div className="btn-group">
          <button className="btn btn-secondary" disabled={disabled}>
            <box-icon name='chevron-left' size="14px"></box-icon>
          </button>
          <button className="btn btn-secondary" disabled={disabled}>
            <box-icon name='chevron-right' size="14px"></box-icon>
          </button>
        </div>
      </div>
    </div> 
  )
}

export default InventoryPaginationSection