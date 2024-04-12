import "boxicons"
import UiStatus from "../../utils/classes/UiStatus.jsx"
import UiHelper from "../../utils/helpers/UiHelper.jsx"

function PrimaryButton({
  status, size, submit, 
  fullWidth, disabled, 
  onClick, children
}) {
  return (
    <BaseButton
    status={status}
    variant="btn-dark"
    size={size}
    submit={submit}
    fullWidth={fullWidth}
    disabled={disabled}
    onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}
function SecondaryButton({
  status, size, submit, 
  fullWidth, disabled, 
  onClick, children
}) {
  return (
    <BaseButton
      status={status}
      variant="btn-secondary"
      size={size}
      submit={submit}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}
function BaseButton({
  status, variant, size="md", submit="button", 
  fullWidth, disabled, 
  onClick, children
}) {
  const isDisabled = disabled || (status == UiStatus.LOADING)

  return (
    <button 
      type={submit} 
      className={`
        btn
        app-button
        ${variant}
        ${size}
        ${fullWidth ? 'btn-block' : ''}
        ${UiHelper.isLoading(status)}
        `
      }
      disabled={isDisabled}
      onClick={onClick}
    >
      <LoadingIcon status={status} />
      <span className="app-button-text">
        {children}
      </span>
    </button>
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

export { PrimaryButton, SecondaryButton }