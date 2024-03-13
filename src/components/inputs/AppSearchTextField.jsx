import { BiSearch, BiSearchAlt } from "react-icons/bi"

function AppSearchTextField({placeholder, disabled, value, onChange}) {
  return (
    <div className="app-input-text-search">
      <input 
        type="text" 
        className="form-control app-input-text-search-input" 
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

export default AppSearchTextField