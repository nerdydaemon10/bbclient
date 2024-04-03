import { useDispatch, useSelector } from "react-redux"

import AppFormModal from "../../components/forms/AppFormModal.jsx"
import AppFormSelect from "../../components/forms/AppFormSelect.jsx"
import AppFormTextField from "../../components/forms/AppFormTextField.jsx"
import { productCategories } from "../../../utils/Configs.jsx"
import { findErrorByName } from "../../../utils/helpers/FormHelper.jsx"
import { fetchProductsAsync, updateProductAsync } from "../../redux/inventory/inventorySlice.jsx"
import { useContext, useEffect } from "react"
import InventoryContext from "./InventoryContext.jsx"
import { enqueueSnackbar } from "notistack"
import UiStatus from "../../../utils/classes/UiStatus.jsx"

function UpdateModal() {
  const dispatch = useDispatch()
  const { updateProductResponse } = useSelector((state) => state.inventory)
  const { status, message, error } = updateProductResponse
  const { isUpdateModalOpen, setIsUpdateModalOpen, product, setProduct } = useContext(InventoryContext)

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value})
  }
  
  const handleClose = () => {
    setIsUpdateModalOpen(false)
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(updateProductAsync(product))
  }
  
  useEffect(() => {
    if (status == UiStatus.SUCCESS) {
      setIsUpdateModalOpen(false)
      enqueueSnackbar(message)

      dispatch(fetchProductsAsync())
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) {
    return <></>
  }

  return (
    <AppFormModal 
      title="Update Product"
      status={status}
      isOpen={isUpdateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <AppFormTextField 
            name="name"
            label="Name"
            placeholder="e.g., Coffee Power"
            value={product.name}
            feedback={findErrorByName(error, "name")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
            name="description"
            label="Description"
            placeholder="e.g., 100 grams, with free spoon"
            value={product.description}
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
            options={productCategories}
            value={product.category_id}
            feedback={findErrorByName(error, "category_id", "category")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
              name="quantity"
              label="Quantity"
              placeholder="e.g., 75"
              value={product.quantity}
              feedback={findErrorByName(error, "quantity")}
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
            value={product.srp}
            feedback={findErrorByName(error, "srp")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <AppFormTextField 
            name="member_price"
            label="Member Price"
            placeholder="e.g., 90.00"
            value={product.member_price}
            feedback={findErrorByName(error, "member_price")}
            onChange={handleChange}
          />
        </div>
      </div>
    </AppFormModal>
  )
}

export default UpdateModal