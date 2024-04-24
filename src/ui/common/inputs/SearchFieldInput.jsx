import { BiSearch } from "react-icons/bi"

function SearchFieldInput({className, name, placeholder, isDisabled, value, onChange}) {
  return (
    <div className="app-input-text-search">
      <input 
        className={`form-control app-input-text-search-input ${className}`}
        type="text" 
        name={name}
        placeholder={placeholder} 
        disabled={isDisabled}
        value={value} 
        onChange={onChange}
      />
      <span className="app-input-text-search-icon">
        <BiSearch size={16} />
      </span>
    </div>
  )
}

export default SearchFieldInput