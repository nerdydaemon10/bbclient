import { FaExclamation } from "react-icons/fa6"

import prototypes from "../../utils/prototypes.jsx"

prototypes.init()

function AppFormTextField({name, label, placeholder, value, error, onChange}) {
  const isInvalid = error.length > 0 ? "is-invalid" : ""
  
  return (
    <div className="-sy-4">
      <label className="app-text-label">{label}</label>
      <input 
        className={`form-control ${isInvalid}`} 
        type="text" 
        name={name}
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
      />
      <div className="invalid-feedback">
        <FaExclamation />
        {error}
      </div>
    </div>
  )
}

export default AppFormTextField