import UiStatus from "../../utils/classes/UiStatus.jsx"
import UiHelper from "../../utils/helpers/UiHelper.jsx"

function AppFormDialog({title, status, isOpen, onClose, onConfirm, children}) {
  const isLoading = status == UiStatus.LOADING ? "is-loading" : ""

  document.body.style.overflow = isOpen ? "hidden" : "unset"

  return (
    <div className={`app-dialog-container ${UiHelper.isOpen(isOpen)}`}>
      <form className="app-dialog" onSubmit={onConfirm}>
        <div className="app-dialog-header">
          <h6 className="mb-0">{title}</h6>
        </div>
        <div className="app-dialog-body">
          {children}
        </div>
        <div className="app-dialog-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          <button type="submit" className={`btn btn-dark -btn-stateful ${isLoading}`}>
            <span className="-btn-stateful-icon">
              <box-icon name="loader" animation="spin" color="#fff"></box-icon>
            </span>
            <span className="-btn-stateful-text">Confirm</span>
          </button>
        </div>
      </form>
    </div>
  )
}
  
export default AppFormDialog