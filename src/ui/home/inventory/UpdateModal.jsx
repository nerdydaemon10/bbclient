/* eslint-disable react-hooks/exhaustive-deps */
import { enqueueSnackbar } from "notistack"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DELAY_MILLIS, productCategories } from "../../../utils/Config.jsx"
import { findErrorByName } from "../../../utils/helpers/FormHelper.jsx"
import { resetStates, setProduct, toggleModal, updateProductAsync } from "../../redux/inventorySlice.jsx"

import { FormModal, FormSelectInput, FormTextFieldInput } from "../../common"
import { InventoryContext } from "./InventoryProvider.jsx"
import ModalType from "../../../utils/classes/ModalType.jsx"
import GenericMessage from "../../../utils/classes/GenericMessage.jsx"

function UpdateModal() {
  const dispatch = useDispatch()
  
  const { isUpdateModalOpen, product, updateApiResource } = useSelector((state) => state.inventory)
  const { handleFetchProductsAsync } = useContext(InventoryContext)

  const handleClose = () => {
    dispatch(toggleModal({ modalType: ModalType.UPDATE, open: false }))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(updateProductAsync(product))
  }

  const handleChange = (e) => {
    dispatch(setProduct({ ...product, [e.target.name]: e.target.value}))
  }
  
  useEffect(() => {
    if (updateApiResource.isSuccess) {
      dispatch(toggleModal({modalType: ModalType.UPDATE, open: false}))
      enqueueSnackbar(GenericMessage.PRODUCT_UPDATED)
      handleFetchProductsAsync()
      // reset all redux-action-states including success that trigger snackbar
      setTimeout(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [updateApiResource.isSuccess])
  
  return (
    <FormModal 
      title="Update Product"
      isLoading={updateApiResource.isLoading}
      isOpen={isUpdateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <FormTextFieldInput 
            label="Name"
            name="name"
            placeholder="e.g., Coffee Power"
            value={product.name}
            feedback={findErrorByName(updateApiResource.error, "name")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
            label="Description"
            name="description"
            placeholder="e.g., 100 grams, with free spoon"
            value={product.description}
            feedback={findErrorByName(updateApiResource.error, "description")}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <FormSelectInput
            label="Category"
            name="category_id"
            options={productCategories}
            value={product.category_id}
            feedback={findErrorByName(updateApiResource.error, "category_id", "category")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
              label="Quantity"
              name="quantity"
              placeholder="e.g., 75"
              value={product.quantity}
              feedback={findErrorByName(updateApiResource.error, "quantity")}
              onChange={handleChange}
            />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <FormTextFieldInput 
            label="SRP"
            name="srp"
            placeholder="e.g., 80.00"
            value={product.srp}
            feedback={findErrorByName(updateApiResource.error, "srp")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
            label="Member Price"
            name="member_price"
            placeholder="e.g., 90.00"
            value={product.member_price}
            feedback={findErrorByName(updateApiResource.error, "member_price")}
            onChange={handleChange}
          />
        </div>
      </div>
    </FormModal>
  )
}

export default UpdateModal