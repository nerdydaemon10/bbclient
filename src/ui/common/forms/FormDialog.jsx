import { useEffect } from "react"

import UiHelper from "../../../util/helpers/UiHelper.jsx"
import { PrimaryButton, SecondaryButton } from "../buttons"

function FormDialog({title, isLoading, isOpen, onClose, onConfirm, children}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

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
          <SecondaryButton 
            onClick={onClose}
          >
            Close
          </SecondaryButton>
          <PrimaryButton
            isLoading={isLoading}
            isSubmit={true}
            onClick={onConfirm}
          >
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}

export default FormDialog