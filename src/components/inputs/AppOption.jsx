import React from "react"

function AppOption({name, items, value, onChange}) {
  return (
    <div className="btn-group w-100 mb-0" role="group">
      {
        items.map((item, index) => (
          <React.Fragment key={index}>
            <input
              className="btn-check"
              type="radio" 
              name={name} 
              id={`${name}${index}`} 
              autoComplete="off" 
              checked={item.value == value} 
              onChange={() => onChange(item.value)}
            />
            <label
              key={index}
              className={`btn btn-outline-dark d-flex align-items-center justify-content-center`}
              htmlFor={`${name}${index}`}
            >
              {item.icon}
              {item.name}
            </label>
          </React.Fragment>
        ))
      }
    </div>
  )
}

export default AppOption