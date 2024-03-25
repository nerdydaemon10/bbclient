import { useDispatch, useSelector } from "react-redux"
import AppFormModal from "../../../../components/forms/AppFormModal.jsx"
import AppFormSelect from "../../../../components/forms/AppFormSelect.jsx"
import AppFormTextField from "../../../../components/forms/AppFormTextField.jsx"
import ProductCategories from "../../../../utils/data/ProductCategories.jsx"
import { findErrorByName } from "../../../../utils/helpers/FormHelper.jsx"
import { useContext, useEffect } from "react"
import { createProductAsync, fetchProductsAsync } from "../../../../redux/inventory/inventorySlice.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
import InventoryContext from "../../../../contexts/InventoryContext.jsx"
import { enqueueSnackbar } from "notistack"

function CreateModal() {
  const dispatch = useDispatch()

  const { 
    isCreateModalOpen, setIsCreateModalOpen, 
    createParam, setCreateParam
  } = useContext(InventoryContext)

  const { createProductResponse } = useSelector((state) => state.inventory)
  const { status, message, error } = createProductResponse

  const handleChange = (e) => {
    setCreateParam(prev => {
      return {...prev, [e.target.name]: e.target.value} 
    })
  }

  const handleClose = () => {
    setIsCreateModalOpen(false)
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(createProductAsync(createParam))
  }

  useEffect(() => {
    if (status != UiStatus.SUCCESS) {
      return
    }

    setIsCreateModalOpen(false)
    enqueueSnackbar(message)
    dispatch(fetchProductsAsync())
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppFormModal 
      title="Create Product"
      status={status}
      isOpen={isCreateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <AppFormTextField 
            name="name"
            label="Name"
            placeholder="e.g., Coffee Power"
            value={createParam.name}
            feedback={findErrorByName(error, "name")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
            name="description"
            label="Description"
            placeholder="e.g., 100 grams, with free spoon"
            value={createParam.description}
            feedback={findErrorByName(error, "description")}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <AppFormSelect 
            name="category_id"
            label="Category"
            options={ProductCategories}
            value={createParam.category_id}
            feedback={findErrorByName(error, "category_id", "category")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
              name="quantity"
              label="Quantity"
              placeholder="e.g., 75"
              value={createParam.quantity}
              feedback={findErrorByName(error,"quantity")}
              onChange={handleChange}
            />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <AppFormTextField 
            name="srp"
            label="SRP"
            placeholder="e.g., 80.00"
            value={createParam.srp}
            feedback={findErrorByName(error, "srp")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
            name="member_price"
            label="Member Price"
            placeholder="e.g., 90.00"
            value={createParam.member_price}
            feedback={findErrorByName(error, "member_price")}
            onChange={handleChange}
          />
        </div>
      </div>
    </AppFormModal>
  )
}

export default CreateModal