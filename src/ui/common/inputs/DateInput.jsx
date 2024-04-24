function DateInput({name, isDisabled, value, onChange}) {
  return (
    <input 
      className={`form-control`}
      type="date" 
      name={name}
      disabled={isDisabled}
      value={value} 
      onChange={onChange}
    />
  )
}

export default DateInput