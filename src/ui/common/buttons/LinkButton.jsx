import { Link } from "react-router-dom"

function LinkButton({
  to,
  target,
  variant="dark",
  size="md",
  isLoading,
  isDisabled,
  isDownload,
  isFullWidth,
  isReplace,
  onClick,
  className,
  style,
  children
}) {
  return (
    <Link
      to={to}
      target={target}
      download={isDownload}
      replace={isReplace}
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