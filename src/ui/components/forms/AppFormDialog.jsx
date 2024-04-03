import UiStatus from "../../../utils/classes/UiStatus.jsx"
import UiHelper from "../../../utils/helpers/UiHelper.jsx"
import AppPrimaryButton from "../buttons/AppPrimaryButton.jsx"
import AppSecondaryButton from "../buttons/AppSecondaryButton.jsx"

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
          <AppSecondaryButton
            text="Close"
            onClick={onClose}
          />
          <AppPrimaryButton
            text="Confirm"
            status={status}
            submit={true}
            onClick={onConfirm}
          />
        </div>
      </form>
    </div>
  )
}
  
export default AppFormDialog