import { isUndefined } from "lodash"
import React from "react"

function SelectInput({name, options, isDisabled, isAllCategoriesEnabled, value, onChange, onRender}) {
  return (
    <select 
      className="form-select" 
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
  )
}

export default SelectInput