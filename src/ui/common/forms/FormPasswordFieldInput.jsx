import { forwardRef } from "react"
import { Flex } from "../index"

const FormPasswordFieldInput = forwardRef(function FormTextFieldInput(props, ref) {
  const { label, name, placeholder, feedback, value, onChange } = props
  const { state, message } = feedback

  const variant = state == "is-valid"
    ? "valid"
    : "invalid"

  return (
    <Flex direction="column" gap={1}>
      <label className="fw-medium">{label}</label>
      <input 
        className={`form-control ${state}`} 
        type="password" 
        name={name}
        placeholder={placeholder}
        ref={ref}
        value={value} 
        onChange={onChange}
      />
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </Flex>
  )
})

export default FormPasswordFieldInput