function Button({
  extendedRef,
  className,
  style,
  variant="dark",
  size="md",
  isLoading,
  isSubmit, 
  isFullWidth, 
  isDisabled, 
  onClick,
  children
}) {
  return (
    <button 
      ref={extendedRef}
      className={`btn btn-${variant} btn-${size} ${isFullWidth && "d-block w-100"} ${className}`} 
      style={style}
      type={isSubmit ? "submit" : "button" }
      disabled={isDisabled || isLoading}
      onClick={(isDisabled || isLoading) ? undefined : onClick}
    >
      {isLoading && <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>}
      <span role="status">{children}</span>
    </button>
  )
}

export default Button