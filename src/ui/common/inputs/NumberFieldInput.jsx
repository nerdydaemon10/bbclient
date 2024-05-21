import { round } from "lodash"
import { forwardRef } from "react"
import { countDecimal } from "../../../util/helper.js"

const NumberFieldInput = forwardRef(function NumberFieldInput(props, ref) {
  const { label, name, placeholder, isReadOnly, feedback, value, onChange } = props
  const { state, message } = feedback || { state: "", message: ""}

  const variant = state == "is-valid"
    ? "valid"
    : "invalid"

  const handleChange = (e) => {
    const value = e.target.value

    if (isNaN(value)) return
    if (countDecimal(value) > 2) e.target.value = round(value, 2)
    
    onChange(e)
  }
  
  return (
    <div className="d-flex flex-column gap-1">
      <label className="fs-7 fw-medium">
        {label} {props.isRequired && <span className="text-danger">*</span>}
      </label>
      <input
        className={`form-control ${state}`} 
        type="text" 
        name={name}
        placeholder={placeholder}
        readOnly={isReadOnly}
        ref={ref}
        value={value}
        maxLength={props.maxLength}
        onChange={handleChange}
      />
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </div>
  )
})

export default NumberFieldInput