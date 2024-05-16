import { enqueueSnackbar } from "notistack"
import {useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { productCategories } from "../../util/Config.jsx"
import { closeModal, setProduct } from "../redux/inventorySlice.js"
import { Modal, SelectInput, TextFieldInput } from "../common"
import ModalType from "../../util/classes/ModalType.js"
import GenericMessage from "../../util/classes/GenericMessage.js"
import ProductCategory from "../../util/classes/ProductCategory.js"
import { useUpdateProductMutation } from "../../data/services/products.js"
import { getErrorByName } from "../../util/helper"

function UpdateModal() {
  const dispatch = useDispatch()
  const { product, isUpdateModalOpen } = useSelector((state) => state.inventory)
  const [updateProduct, { isLoading, isSuccess, error }] = useUpdateProductMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.UPDATE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    updateProduct(product)
  }

  const handleChange = (e) => {
    dispatch(setProduct({ ...product, [e.target.name]: e.target.value}))
  }
  
  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.UPDATE))
    enqueueSnackbar(GenericMessage.PRODUCT_UPDATED)
  }, [dispatch, isSuccess])

  return (
    <Modal 
      title="Update Product"
      isLoading={isLoading}
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
            feedback={getErrorByName(error, "name")}
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Description"
            name="description"
            placeholder="e.g., 100 grams, with free spoon"
            feedback={getErrorByName(error, "description")}
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
            feedback={getErrorByName(error, "category_id", "category")}
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
            feedback={getErrorByName(error, "quantity")}
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
            feedback={getErrorByName(error, "srp")}
            value={product.srp}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Member Price"
            name="member_price"
            placeholder="e.g., 90.00"
            feedback={getErrorByName(error, "member_price")}
            value={product.member_price}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default UpdateModal