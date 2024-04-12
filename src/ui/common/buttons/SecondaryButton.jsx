import BaseButton from "./BaseButton.jsx"

function SecondaryButton({
  size, isLoading,
  isSubmit, isFullWidth, isDisabled, 
  onClick, children
}) {
  return (
    <BaseButton
      variant="btn-secondary"
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

export default SecondaryButton