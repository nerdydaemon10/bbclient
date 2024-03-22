import { FaCheck, FaExclamation } from "react-icons/fa6"
import { BiUpload } from "react-icons/bi"
import AppLabelButton from "../buttons/AppLabelButton.jsx"
import ObjectHelper from "../../utils/helpers/ObjectHelper.jsx"

function AppFormFile({name, label, placeholder, value, feedback, onChange}) {
  const { state, message } = feedback

  const variant = state == "is-valid"
    ? "valid"
    : "invalid"

  const icon = state == "is-valid" 
    ? (<FaCheck />)
    : (<FaExclamation />)

  const text = ObjectHelper.isFile(value) ? value.name : placeholder
  
  return (
    <div className="app-sy-8">
      <label className="app-text-label">{label}</label>
      <input
        className={`${state} d-none`} 
        type="file"
        name={name}
        id={name}
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
      <AppLabelButton
        icon={<BiUpload className="me-2" />}
        text={text}
        htmlFor={name}
        variant="btn-secondary"
        fullWidth={true}
      />
    </div>
  )
}

export default AppFormFile