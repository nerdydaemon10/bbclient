/* eslint-disable react-hooks/exhaustive-deps */
import { enqueueSnackbar } from "notistack"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DELAY_MILLIS, productCategories } from "../../../util/Config.jsx"
import { resetStates, setProduct, toggleModal, updateProductAsync } from "../../redux/inventorySlice.js"
import { Modal, SelectInput, TextFieldInput } from "../../common"
import { InventoryContext } from "./InventoryProvider.jsx"
import ModalType from "../../../util/classes/ModalType.js"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import ProductCategory from "../../../util/classes/ProductCategory.js"
import { findErrorByName } from "../../../util/helper.jsx"

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
    <Modal 
      title="Update Product"
      isLoading={updateApiResource.isLoading}
      isOpen={isUpdateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput 
            label="Name"
            name="name"
            placeholder="e.g., Coffee Power"
            feedback={findErrorByName(updateApiResource.error, "name")}
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Description"
            name="description"
            placeholder="e.g., 100 grams, with free spoon"
            feedback={findErrorByName(updateApiResource.error, "description")}
            value={product.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <SelectInput
            label="Category"
            name="category_id"
            options={productCategories}
            feedback={findErrorByName(updateApiResource.error, "category_id", "category")}
            value={product.category_id}
            onChange={handleChange}
            onRender={(option) => ProductCategory.toCategory(option)}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Quantity"
            name="quantity"
            placeholder="e.g., 75"
            feedback={findErrorByName(updateApiResource.error, "quantity")}
            value={product.quantity}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput 
            label="SRP"
            name="srp"
            placeholder="e.g., 80.00"
            feedback={findErrorByName(updateApiResource.error, "srp")}
            value={product.srp}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Member Price"
            name="member_price"
            placeholder="e.g., 90.00"
            feedback={findErrorByName(updateApiResource.error, "member_price")}
            value={product.member_price}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default UpdateModal