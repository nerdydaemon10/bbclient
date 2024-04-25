function TrendCard({title, count, description, icon, className, style}) {
  return (
    <div 
      className={`trend-card d-flex align-items-center border rounded shadow-sm p-4 ${className}`} 
      style={style}
    >
      <div className="d-block w-100">
        <div className="d-flex justify-content-between align-items-center">
          <h6>{title}</h6>
          <span className="text-body-secondary fs-5">{icon}</span>
        </div>
        <h2 className="fw-semibold mb-0">{count}</h2>
        <small className="text-body-secondary">{description}</small>
      </div>
    </div>
  )
}

export default TrendCard