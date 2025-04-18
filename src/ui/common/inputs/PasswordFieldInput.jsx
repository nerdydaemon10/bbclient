import { forwardRef } from "react"

const PasswordFieldInput = forwardRef(function PasswordFieldInput(props, ref) {
  const { label, name, placeholder, isReadOnly, feedback, value, onChange } = props
  const { state, message } = feedback || { state: "", message: ""}

  const variant = state == "is-valid"
    ? "valid"
    : "invalid"
  
  return (
    <div className="d-flex flex-column gap-1">
      <label className="fs-7 fw-medium">{label}</label>
      <input
        className={`form-control ${state}`} 
        type="password" 
        name={name}
        placeholder={placeholder}
        readOnly={isReadOnly}
        ref={ref}
        value={value} 
        onChange={onChange}
      />
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </div>
  )
})

export default PasswordFieldInput