import { useContext } from "react"

import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import AppSearchField from "../../../../components/inputs/AppSearchField.jsx"
import AppSelect from "../../../../components/inputs/AppSelect.jsx"
import { BiPlus } from "react-icons/bi"
import AppSecondaryButton from "../../../../components/buttons/AppSecondaryButton.jsx"

import styles from "./styles.module.css"
import InventoryContext from "../../../../contexts/InventoryContext.jsx"
import { useDispatch } from "react-redux"
import { resetErrorsAndNotifications } from "../../../../redux/inventory/inventorySlice.jsx"

function FilteringContainer({name, category, onNameChange, onCategoryChange}) {
  const dispatch = useDispatch()
  const { setIsCreateModalOpen, resetCreateParam } = useContext(InventoryContext)
  
  const handleCreateClick = () => {
    dispatch(resetErrorsAndNotifications())
    resetCreateParam()
    setIsCreateModalOpen(true)
  }
  
  return (
    <div className={styles.filteringContainer}>
      <div className="row w-50 gx-2">
        <div className="col-6">
          <AppSearchField
            name="name"
            placeholder="Filter Products..."
            value={name}
            onChange={onNameChange}
          />
        </div>
        <div className="col-4">
          <AppSelect
            name="category"
            options={ProductCategories}
            defaultOption="-- All Categories --"
            value={category}
            onChange={onCategoryChange}
          />
        </div>
        <div className="col-2"></div>
      </div>
      <div className="ms-auto">
        <AppSecondaryButton
          icon={<BiPlus className="me-1" />}
          text="Create Product"
          onClick={handleCreateClick}
        />
      </div>
    </div>
  )
}

export default FilteringContainer