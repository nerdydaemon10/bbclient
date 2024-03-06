import AppBaseButton from "./AppBaseButton.jsx";

function AppSecondaryButton({text, type, status, fullWidth, onClick}) {
  return (
    <AppBaseButton
      text={text}
      type={type}
      status={status}
      color="btn-secondary"
      fullWidth={fullWidth}
      onClick={onClick}
    />
  )
}

export default AppSecondaryButton