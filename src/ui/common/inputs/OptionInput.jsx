import { Fragment } from "react"

function OptionInput({label, name, options, size="md", feedback, value, onChange}) {
  const { state, message } = feedback || { state: "", message: ""}

  const variant = state == "is-valid"
    ? "valid"
    : "invalid"
  
  return (
    <div className="d-flex flex-column gap-1">
      {label && <label className="fs-7 fw-medium">{label}</label>}
      <div className={`btn-group w-100 mb-0  ${state}`} role="group">
        {
          options.map((option, index) => (
            <Fragment key={index}>
              <input
                className="btn-check"
                type="radio" 
                name={name} 
                id={`${name}${index}`} 
                autoComplete="off" 
                checked={option.value == value} 
                onChange={() => onChange(option.value)}
              />
              <label
                key={index}
                className={`btn btn-${size} btn-outline-dark d-flex align-items-center justify-content-center`}
                htmlFor={`${name}${index}`}
              >
                {option.icon}
                {option.name}
              </label>
            </Fragment>
          ))
        }
      </div>
      <div className={`${variant}-feedback`}>
        {message}
      </div>
    </div>
  )
}

export default OptionInput