import UiStatus from "../../../utils/classes/UiStatus.jsx"
import UiHelper from "../../../utils/helpers/UiHelper.jsx"
import AppPrimaryButton from "../buttons/AppPrimaryButton.jsx"
import AppSecondaryButton from "../buttons/AppSecondaryButton.jsx"

function AppFormModal({title, status, isOpen, onClose, onConfirm, children}) {
  const isLoading = status == UiStatus.LOADING ? "is-loading" : ""

  document.body.style.overflow = isOpen ? "hidden" : "unset"
  
  return (
    <div className={`app-modal-container ${UiHelper.isOpen(isOpen)}`}>
      <form className="app-modal" onSubmit={onConfirm}>
        <div className="app-modal-header">
          <h6 className="mb-0">{title}</h6>
        </div>
        <div className="app-modal-body">
          {children}
        </div>
        <div className="app-modal-footer">
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
  
export default AppFormModal