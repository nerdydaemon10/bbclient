import { FaExclamation } from "react-icons/fa6"
import prototypes from "../../utils/prototypes.jsx"

prototypes.init()

function AppFormSelect({name, label, options, value, error, onChange}) {
  const isInvalid = error.isNotEmpty() ? "is-invalid" : ""
  
  return (
    <div className="-sy-4">
      <label className="app-text-label">{label}</label>
      <select 
        className={`form-select ${isInvalid}`} 
        name={name}
        defaultValue={value}
        onChange={onChange}
      >
        {
          options.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
          ))
        }
      </select>
      <div className="invalid-feedback">
        <FaExclamation />
        {error}
      </div>
    </div>
  )
}

export default AppFormSelect