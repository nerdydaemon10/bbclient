import { useEffect } from "react"

import Button from "../buttons/Button.jsx"
import ModalStyle from "./ModalStyle.jsx"

function Modal({title, isLoading, isOpen, onClose, onConfirm, children}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

  return (
    <>
      <ModalStyle />
      <div className={`x-modal-container position-fixed start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center ${isOpen ? "is-open" : ""}`}>
        <form className="x-modal bg-white rounded" onSubmit={onConfirm}>
          <div className="p-3">
            <h6 className="text-body-primary fw-semibold mb-0">{title}</h6>
          </div>
          <div className="x-modal-body px-3">
            {children}
          </div>
          <div className="d-flex flex-row justify-content-end gap-2 p-3">
            <Button variant="light" onClick={onClose}>
              Close
            </Button>
            <Button variant="dark" isLoading={isLoading} isSubmit={true} onClick={onConfirm}>
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Modal