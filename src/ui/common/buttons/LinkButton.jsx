import { Link } from "react-router-dom"

function LinkButton({
  to,
  variant="dark",
  size="md",
  isLoading,
  isDisabled, 
  isFullWidth, 
  onClick,
  className,
  style,
  children
}) {
  return (
    <Link
      to={to}
      role="button"
      type="button"
      disabled={isDisabled || isLoading}
      onClick={(isDisabled || isLoading) ? undefined : onClick}
      className={`btn btn-${variant} btn-${size} ${isFullWidth && "d-block w-100"} ${className}`}
      style={style}
    >
      {isLoading && <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>}
      <span role="status">{children}</span>
    </Link>
  )
}

export default LinkButton