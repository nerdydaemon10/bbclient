import { FaExclamation } from "react-icons/fa6"
import AppOption from "../inputs/AppOption.jsx"

function AppFormOption({name, label, items, value, error=null, onChange}) {
  return (
    <div className="app-sy-4">
      <label className="app-text-label">{label}</label>
      <AppOption
        name={name}
        items={items}
        value={value}
        onChange={onChange}
      />
      {
        !error ? (
          <div className="invalid-feedback">
            <FaExclamation />
            {error}
          </div>
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default AppFormOption