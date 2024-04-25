import "boxicons"
import { BiLoader, BiLoaderAlt } from "react-icons/bi"

function BaseButton({
  variant, size="btn-md", isLoading=false, 
  isSubmit, isFullWidth, isDisabled, 
  onClick, children
}) {
  return (
    <button 
      type={isSubmit ? "submit" : "button"} 
      className={`
        btn
        app-button
        ${variant}
        ${size}
        ${isFullWidth ? "btn-block" : ""}
        ${isLoading ? "is-loading" : ""}
        `
      }
      disabled={isDisabled || isLoading}
      onClick={isDisabled ? undefined : onClick}
    >
      {isLoading && <LoadingIcon />}
      <span className="app-button-text">
        {children}
      </span>
    </button>
  )
}
function LoadingIcon() {
  return (
    <span className="app-button-icon">
      <BiLoaderAlt size={20} className="react-icons-spin" />
    </span>
  )
}

export default BaseButton