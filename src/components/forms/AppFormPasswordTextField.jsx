import { FaCheck, FaExclamation } from "react-icons/fa6"

function AppFormPasswordTextField({name, label, placeholder, value, feedback, onChange}) {
  const { state, message } = feedback
  const variant = state == "is-valid"
    ? "valid"
    : "invalid"
  const icon = state == "is-valid" 
    ? (<FaCheck />)
    : (<FaExclamation />)

  return (
    <div className="-sy-4">
      <label className="app-text-label">{label}</label>
      <input 
        className={`form-control ${state}`} 
        type="password" 
        name={name}
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
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
}

export default AppFormPasswordTextField