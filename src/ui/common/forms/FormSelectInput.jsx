import { FaCheck, FaExclamation } from "react-icons/fa6"

function FormSelectInput({label, name, options, value, feedback, onChange}) {
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
      <select 
        className={`form-select ${state}`} 
        name={name}
        defaultValue={value}
        onChange={onChange}
      >
        {options.map((item, index) => (<option key={index} value={item.id}>{item.name}</option>))}
      </select>
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

export default FormSelectInput