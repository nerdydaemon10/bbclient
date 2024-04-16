import React from "react"

function OptionInput({name, options, value, onChange}) {
  return (
    <div className="btn-group w-100 mb-0" role="group">
      {
        options.map((option, index) => (
          <React.Fragment key={index}>
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
              className={`btn btn-outline-dark d-flex align-items-center justify-content-center`}
              htmlFor={`${name}${index}`}
            >
              {option.icon}
              {option.name}
            </label>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default OptionInput