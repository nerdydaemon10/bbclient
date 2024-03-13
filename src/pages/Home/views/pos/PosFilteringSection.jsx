import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import UiHelper from "../../../../utils/helpers/UiHelper.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"

function PosFilteringSection() {
  const dispatch = useDispatch()
  const { params } = useSelector((state) => state.pos)
  
  const handleChange = (e) => {
    handleParamsChange({...params, [e.target.name]: e.target.value})
  }

  const handleSearchFilter = UiHelper.setDebouncer((filter, pagination) => {
    //dispatch(fetchProductsAsync(filter, pagination))
  })

  useEffect(() => {
    handleSearchFilter(filter, pagination)
  }, [handleSearchFilter, filter, pagination])

  return (
    <div className="pos-products-table-header">
      <div className="row gx-2">
        <div className="col-9">
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Filter Products..."
            value={filter.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-3">
          <select 
            className="form-select" 
            name="category_id"
            value={filter.category_id}
            onChange={handleChange}
          >
            <option value={""}>-- All Categories --</option>
            {ProductCategories.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default PosFilteringSection