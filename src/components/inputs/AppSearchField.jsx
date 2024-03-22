import { BiSearch } from "react-icons/bi"

function AppSearchField({name, placeholder, disabled, value, onChange}) {
  return (
    <div className="app-input-text-search">
      <input 
        className="form-control app-input-text-search-input" 
        type="text" 
        name={name}
        placeholder={placeholder} 
        disabled={disabled}
        value={value} 
        onChange={onChange}
      />
      <span className="app-input-text-search-icon">
        <BiSearch size={16} />
      </span>
    </div>
  )
}

export default AppSearchField