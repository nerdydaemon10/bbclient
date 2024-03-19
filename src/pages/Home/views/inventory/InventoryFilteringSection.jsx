import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import UiHelper from "../../../../utils/helpers/UiHelper.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import { fetchProductsAsync } from "../../../../redux/pos/posSlice.jsx"

function InventoryFilteringSection() {
  const dispatch = useDispatch()
  const [params, setParams] = useState({
    name: "",
    category_id: ""
  })

  const handleChange = (e) => {
    setParams({...params, [e.target.name]: e.target.value})
  }

  const handleSearchFilter = UiHelper.setDebouncer((params) => {
    dispatch(fetchProductsAsync(params))
  })

  useEffect(() => {
    handleSearchFilter(params)
  }, [handleSearchFilter, params])

  return (
    <div className="inventory-filtering-section">
      <div className="row gx-2">
        <div className="col-9">
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Filter Products..."
            value={params.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-3">
          <select 
            className="form-select" 
            name="category_id"
            value={params.category_id}
            onChange={handleChange}
          >
            <option value={""}>-- All Categories --</option>
            {ProductCategories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default InventoryFilteringSection