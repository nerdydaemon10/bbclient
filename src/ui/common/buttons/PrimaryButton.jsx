import BaseButton from "./BaseButton.jsx"

function PrimaryButton({
  size, isLoading,
  isSubmit, isFullWidth, isDisabled, 
  onClick, children
}) {
  return (
    <BaseButton
      variant="btn-dark"
      size={size}
      isLoading={isLoading}
      isSubmit={isSubmit}
      isFullWidth={isFullWidth}
      isDisabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}

export default PrimaryButton