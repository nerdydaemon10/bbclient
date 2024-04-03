import "boxicons"
import UiHelper from "../../../utils/helpers/UiHelper.jsx"
import UiStatus from "../../../utils/classes/UiStatus.jsx"

function AppLabelButton({icon, text, status, variant, size="md", htmlFor, fullWidth, disabled, onClick}) {
  return (
    <label 
      type="button"
      role="button"
      htmlFor={htmlFor}
      className={`
        btn
        app-button
        ${variant}
        ${size}
        ${fullWidth ? 'btn-block' : ''}
        ${UiHelper.isLoading(status)}
        `
      }
      disabled={disabled}
      onClick={onClick}
    >
      <LoadingIcon status={status} />
      <IconAndText icon={icon} text={text} />
    </label>
  )
}

function LoadingIcon({status}) {
  return (
    status == UiStatus.LOADING ? (
      <span className="app-button-icon">
        <box-icon name="loader" animation="spin" color="#fff"></box-icon>
      </span>
    ) : <></>
  )
}

function IconAndText({icon, text}) {
  return (
    icon ? (
      <span className="app-button-text d-flex align-items-center justify-content-center">
        {icon}
        {text}
      </span>
    ) : (
      <span className="app-button-text">
        {text}
      </span>
    )
  )
}

export default AppLabelButton