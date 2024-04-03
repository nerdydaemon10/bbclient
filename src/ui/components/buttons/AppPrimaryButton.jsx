import AppBaseButton from "./AppBaseButton.jsx";

function AppPrimaryButton({icon, text, status, size, fullWidth, submit, disabled, onClick}) {
  return (
    <AppBaseButton
      icon={icon}
      text={text}
      status={status}
      variant="btn-dark"
      size={size}
      fullWidth={fullWidth}
      submit={submit}
      disabled={disabled}
      onClick={onClick}
    />
  )
}

export default AppPrimaryButton