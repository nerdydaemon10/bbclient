import { FaCheck, FaExclamation } from "react-icons/fa6"
import OptionInput from "../inputs/OptionInput.jsx"

function AppFormOption({name, label, options, value, feedback, onChange}) {
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
      <OptionInput
        name={name}
        options={options}
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

export default AppFormOption