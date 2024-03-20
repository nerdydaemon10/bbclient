import { useEffect, useRef } from "react"
import { FaExclamation } from "react-icons/fa6"

function AppFormTextField({name, label, placeholder, value, error, onChange}) {
  const isInvalid = error.length > 0 ? "is-invalid" : ""
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  return (
    <div className="app-sy-4">
      <label className="app-text-label">{label}</label>
      <input
        className={`form-control ${isInvalid}`} 
        type="text" 
        name={name}
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        ref={inputRef}
      />
      <div className="invalid-feedback">
        <FaExclamation />
        {error}
      </div>
    </div>
  )
}

export default AppFormTextField