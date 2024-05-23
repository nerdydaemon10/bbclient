function TrendCard({
  title, 
  count, 
  description,
  icon,
  className,
  style
}) {
  return (
    <div 
      className={`trend-card d-flex align-items-center border rounded shadow-sm p-4 ${className}`} 
      style={style}
    >
      <div className="d-block w-100">
        <div className="d-flex justify-content-between mb-3">
          <div>
            <h6 className="mb-0">{title}</h6>
            <p className="text-body-secondary mb-0 fs-9">{description}</p>
          </div>
          <span className="text-body-secondary lh-0 fs-4">{icon}</span>
        </div>
        <h2 className="fw-semibold mb-0">{count}</h2>
      </div>
    </div>
  )
}

export default TrendCard