import AppBaseButton from "./AppBaseButton.jsx";

function AppPrimaryButton({text, type, status, fullWidth, onClick}) {
  return (
    <AppBaseButton
      text={text}
      type={type}
      status={status}
      color="btn-dark"
      fullWidth={fullWidth}
      onClick={onClick}
    />
  )
}

export default AppPrimaryButton