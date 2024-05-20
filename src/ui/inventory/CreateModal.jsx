import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import { productCategories } from "../../util/Config.jsx"
import { closeModal } from "../redux/inventorySlice.js"
import { enqueueSnackbar } from "notistack"
import { Modal, SelectInput, TextFieldInput } from "../common"
import ModalType from "../../util/classes/ModalType.js"
import GenericMessage from "../../util/classes/GenericMessage.js"
import ProductCategory from "../../util/classes/ProductCategory.js"
import { useCreateProductMutation } from "../../data/services/products.js"
import { getErrorByName } from "../../util/helper.js"
import { ProductDto } from "../../data/dto.js"

function CreateModal() {
  const dispatch = useDispatch()
  const [product, setProduct] = useState(ProductDto)
  const { isCreateModalOpen } = useSelector((state) => state.inventory)
  const [createProduct, { isLoading, isSuccess, error }] = useCreateProductMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.CREATE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(createProduct(product))
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.CREATE))
    enqueueSnackbar(GenericMessage.PRODUCT_ADDED)
    setProduct(ProductDto)
  }, [isSuccess, dispatch])

  return (
    <Modal 
      title="Create Product"  
      isLoading={isLoading}
      isOpen={isCreateModalOpen} 
      onClose={handleClose} 
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput
            label="Name"
            placeholder="e.g., Coffee Power"
            name="name"
            value={product.name}
            onChange={handleChange}
            feedback={getErrorByName(error, "name")}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Description"
            placeholder="e.g., 100 grams, with free spoon"
            name="description"
            value={product.description}
            onChange={handleChange}
            feedback={getErrorByName(error, "description")}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <SelectInput
            label="Category"
            name="category_id"
            options={productCategories}
            value={product.category_id}
            onChange={handleChange}
            onRender={(option) => ProductCategory.toCategory(option)}
            feedback={getErrorByName(error, "category_id", "category")}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Quantity"
            placeholder="e.g., 75"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            feedback={getErrorByName(error,"quantity")}
            />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput 
            label="SRP"
            placeholder="e.g., 80.00"
            name="srp"
            value={product.srp}
            onChange={handleChange}
            feedback={getErrorByName(error, "srp")}
          />
        </div>
        <div className="col-6">
          <TextFieldInput
            label="Member Price"
            placeholder="e.g., 90.00"
            name="member_price"
            value={product.member_price}
            onChange={handleChange}
            feedback={getErrorByName(error, "member_price")}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateModal