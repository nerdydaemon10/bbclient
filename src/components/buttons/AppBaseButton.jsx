import "boxicons"
import UiHelper from "../../utils/helpers/UiHelper.jsx"

function AppBaseButton({text, type, status, color, fullWidth, onClick}) {
  const isLoading = UiHelper.isLoading(status)
  const isFullWidth = fullWidth ? "btn-block" : ""
  
  return (
    <button type={type} className={`btn ${color} ${isFullWidth} -btn-stateful ${isLoading}`} onClick={onClick}>
      <span className="-btn-stateful-icon">
        <box-icon name="loader" animation="spin" color="#fff"></box-icon>
      </span>
      <span className="-btn-stateful-text">{text}</span>
    </button>
  )
}

export default AppBaseButton