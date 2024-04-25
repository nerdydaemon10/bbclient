import { isUndefined } from "lodash"

function SelectInput({
  label, name, 
  options, 
  isDisabled, isAllCategoriesEnabled, 
  feedback, 
  value, 
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
        disabled={isDisabled}
        value={value}
        onChange={onChange}
      >
        {isAllCategoriesEnabled && (<option value="">--All-Categories--</option>)}
        {options.map((option, index) => (
          <option key={index} value={option}>
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