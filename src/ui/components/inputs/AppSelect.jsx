import StringHelper from "../../../utils/helpers/StringHelper.jsx"

function AppSelect({name, options, defaultOption, disabled, value, onChange}) {
  return (
    <select 
      className="form-select" 
      name={name}
      disabled={disabled}
      value={value}
      onChange={onChange}
    >
      {StringHelper.notEmpty(defaultOption) && <option value={""}>-- All Categories --</option>}
      {options.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
    </select>
  )
}

export default AppSelect