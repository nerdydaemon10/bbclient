import "boxicons"

function BaseButton({
  variant, size="btn-md", isLoading, 
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
      onClick={onClick}
    >
      {isLoading ? (<LoadingIcon />) : (<></>)}
      <span className="app-button-text">
        {children}
      </span>
    </button>
  )
}
function LoadingIcon() {
  return (
    <span className="app-button-icon">
      <box-icon name="loader" animation="spin" color="#fff"></box-icon>
    </span>
  )
}

export default BaseButton