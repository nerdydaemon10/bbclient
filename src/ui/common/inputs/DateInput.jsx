function DateInput({label, name, isDisabled, feedback, value, onChange}) {
  const { state, message } = feedback || { state: "", message: ""}

  const variant = state == "is-valid"
    ? "valid"
    : "invalid"
    
  return (
    <div className="d-flex flex-column gap-1">
      {label && <label className="fs-7 fw-medium">{label}</label>}
      <input 
        className={`form-control ${state}`}
        type="date" 
        name={name}
        disabled={isDisabled}
        value={value} 
        onChange={onChange}
      />
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </div>
  )
}

export default DateInput