import { forwardRef } from "react"
import { Flex } from "../index"

const FormTextFieldInput = forwardRef(function FormTextFieldInput(props, ref) {
  const { label, name, placeholder, value, feedback, onChange } = props
  const { state, message } = feedback
  
  const variant = state == "is-valid"
    ? "valid"
    : "invalid"
  
  return (
    <Flex direction="column" gap="1">
      <label className="fw-medium">{label}</label>
      <input
        className={`form-control ${state}`} 
        type="text" 
        name={name}
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        ref={ref}
        readOnly={props.isReadOnly}
      />
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </Flex>
  )
})

export default FormTextFieldInput