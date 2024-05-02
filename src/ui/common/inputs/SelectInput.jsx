import { isUndefined } from "lodash"

function SelectInput({
  isDisabled, 
  isReadOnly,
  isOptional,
  label,
  name,
  options,
  feedback,
  value,
  valueSelector,
  onChange,
  onRender
}) {
  const { state, message } = feedback || { state: "", message: ""}

  const variant = state == "is-valid"
    ? "valid"
    : "invalid"

  return (
    <div className="d-flex flex-column gap-1">
      {label && <label className="fs-7 fw-medium">{label}</label>}
      <select 
        className={`form-select  ${state}`}
        name={name}
        disabled={isDisabled || isReadOnly}
        value={value}
        onChange={onChange}
      >
        {isOptional && (<option value="">--All-Categories--</option>)}
        {options.map((option, index) => (
          <option key={index} value={valueSelector ? option[valueSelector] : option}>
            {isUndefined(onRender) ? option : onRender(option)}
          </option>
        ))}
      </select>
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </div>
  )
}

export default SelectInput