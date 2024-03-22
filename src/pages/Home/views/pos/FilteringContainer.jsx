import AppSearchField from "../../../../components/inputs/AppSearchField.jsx"
import AppSelect from "../../../../components/inputs/AppSelect.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"

function FilteringContainer({name, category, onNameChange, onCategoryChange}) {
  return (
    <div className="filtering-container">
      <div className="row gx-2">
        <div className="col-9">
          <AppSearchField 
            placeholder="Filter Products..."
            value={name}
            onChange={onNameChange}
          />
        </div>
        <div className="col-3">
          <AppSelect
            options={ProductCategories}
            defaultOption="-- All Categories --"
            value={category}
            onChange={onCategoryChange}
          />
        </div>
      </div>
    </div>
  )
}
export default FilteringContainer