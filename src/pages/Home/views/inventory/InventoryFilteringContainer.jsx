import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import UiHelper from "../../../../utils/helpers/UiHelper.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import { fetchProductsAsync } from "../../../../redux/pos/posSlice.jsx"
import AppSearchField from "../../../../components/inputs/AppSearchField.jsx"
import AppSelect from "../../../../components/inputs/AppSelect.jsx"
import AppPrimaryButton from "../../../../components/buttons/AppPrimaryButton.jsx"
import { BiPlus } from "react-icons/bi"

function InventoryFilteringContainer() {
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
    <div className="inventory-filtering-container">
      <div className="row gx-2">
        <div className="col-9">
          <AppSearchField 
            placeholder="Filter Products..."
            value={params.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-3">
          <AppSelect
            options={ProductCategories}
            defaultOption="-- All Categories --"
            value={params.category_id}
            onChange={handleChange}
          />
        </div>
      </div>
      <AppPrimaryButton
        icon={<BiPlus />}
        text="Create"
        onClick={() => {}}
      />
    </div>
  )
}

export default InventoryFilteringContainer