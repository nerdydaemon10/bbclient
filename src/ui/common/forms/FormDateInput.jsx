import Flex from "../layouts/Flex.jsx"

function FormDateInput({name, label, isDisabled, value, feedback, onChange}) {
  const { state, message } = feedback
  const variant = state == "is-valid"
    ? "valid"
    : "invalid"
    
  return (
    <Flex direction="column" gap="1">
      <label className="fw-medium">{label}</label>
      <input 
        className={`form-control`}
        type="date" 
        name={name}
        disabled={isDisabled}
        value={value} 
        onChange={onChange}
      />
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </Flex>
  )
}

export default FormDateInput