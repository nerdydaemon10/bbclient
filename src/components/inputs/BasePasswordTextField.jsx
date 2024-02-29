import { FaExclamation } from "react-icons/fa6";
import StringHelper from "../../utils/helpers/StringHelper.jsx"

function BasePasswordTextField(props) {
  const isInvalid = StringHelper.isFormControlInvalid(props.errorMessage)

  return (
    <div className="app-sy-6">
      <label className="app-text-label">{props.label}</label>
      <input 
        className={`form-control ${isInvalid}`} 
        type="password"
        name={props.name} 
        placeholder={props.placeholder} 
        value={props.value} 
        onChange={props.onChange} 
      />
      <div className="invalid-feedback">
        <FaExclamation />
        {props.errorMessage}
      </div>
    </div>
  )
}

export default BasePasswordTextField