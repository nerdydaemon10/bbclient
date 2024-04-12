import { forwardRef } from "react"
import { FaCheck, FaExclamation } from "react-icons/fa6"

const FormTextFieldInput = forwardRef(function FormTextFieldInput(props, ref) {
  const { label, name, placeholder, value, feedback, onChange } = props
  const { state, message } = feedback

  const variant = state == "is-valid"
    ? "valid"
    : "invalid"
  const icon = state == "is-valid" 
    ? (<FaCheck />)
    : (<FaExclamation />)

  return (
    <div className="app-sy-8">
      <label className="app-text-label">{label}</label>
      <input
        className={`form-control ${state}`} 
        type="text" 
        name={name}
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        ref={ref}
      />
      <div className={`${variant}-feedback`}>
        <div className={`${variant}-feedback-icon`}>
          {icon}
        </div>
        <span className={`${variant}-feedback-message`}>
          {message}
        </span>
      </div>
    </div>
  )
})

export default FormTextFieldInput