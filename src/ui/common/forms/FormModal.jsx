import { useEffect } from "react"

import UiHelper from "../../../util/helpers/UiHelper.jsx"
import { PrimaryButton, SecondaryButton } from "../buttons"

function FormModal({title, isLoading, isOpen, onClose, onConfirm, children}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

  return (
    <div className={`x-modal-container ${UiHelper.isOpen(isOpen)}`}>
      <form 
        className="x-modal" 
        onSubmit={onConfirm}
      >
        <div className="x-modal-header">
          <h6 className="mb-0">{title}</h6>
        </div>
        <div className="x-modal-body">
          {children}
        </div>
        <div className="x-modal-footer">
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

export default FormModal

