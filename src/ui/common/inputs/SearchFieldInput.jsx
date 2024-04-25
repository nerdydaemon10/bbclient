import { BiSearch } from "react-icons/bi"

function SearchFieldInput({className, style, label, name, placeholder, isDisabled, value, onChange}) {
  return (
    <div className="d-flex flex-column gap-1">
      {label && <label className="fs-7 fw-medium">{label}</label>}
      <div className="form-control-search-box">
        <input 
          className={`form-control form-control-search ${className}`}
          style={style}
          type="text" 
          name={name}
          placeholder={placeholder} 
          disabled={isDisabled}
          value={value} 
          onChange={onChange}
        />
        <span className="form-control-search-icon">
          <BiSearch size={16} />
        </span>
      </div>
    </div>
  )
}

export default SearchFieldInput