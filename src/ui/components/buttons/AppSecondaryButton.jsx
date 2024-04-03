import AppBaseButton from "./AppBaseButton.jsx";

function AppSecondaryButton({icon, text, status, size, fullWidth, submit, disabled, onClick}) {
  return (
    <AppBaseButton
      icon={icon}
      text={text}
      status={status}
      variant="btn-secondary"
      size={size}
      fullWidth={fullWidth}
      submit={submit}
      disabled={disabled}
      onClick={onClick}
    />
  )
}

export default AppSecondaryButton