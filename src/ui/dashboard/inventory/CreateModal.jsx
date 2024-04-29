/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect, useState } from "react"

import { DELAY_MILLIS, productCategories } from "../../../util/Config.jsx"
import { createProductAsync, resetStates, toggleModal } from "../../redux/inventorySlice.js"
import { enqueueSnackbar } from "notistack"
import { Modal, SelectInput, TextFieldInput } from "../../common"
import ModalType from "../../../util/classes/ModalType.js"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { InventoryContext } from "./InventoryProvider.jsx"
import ProductCategory from "../../../util/classes/ProductCategory.js"
import { first } from "lodash"
import { findErrorByName } from "../../../util/helper.jsx"

const defaultParam = {
  name: "",
  description: "",
  category_id: first(productCategories),
  quantity: "",
  srp: "",
  member_price: ""
}

function CreateModal() {
  const dispatch = useDispatch()

  const { isCreateModalOpen, createApiResource } = useSelector((state) => state.inventory)
  const { handleFetchProductsAsync } = useContext(InventoryContext)

  const [param, setParam] = useState({ ...defaultParam })

  const handleClose = () => {
    dispatch(toggleModal({modalType: ModalType.CREATE, open: false}))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(createProductAsync(param))
  }

  const handleChange = (e) => {
    setParam({ ...param, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (createApiResource.isSuccess) {
      dispatch(toggleModal({modalType: ModalType.CREATE, open: false}))
      enqueueSnackbar(GenericMessage.PRODUCT_ADDED)
      handleFetchProductsAsync()
      // reset param-state
      setParam({ ...defaultParam })
      // reset all redux-action-states including success that trigger snackbar
      setTimeout(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [createApiResource.isSuccess])
  
  return (
    <Modal 
      title="Create Product"
      isLoading={createApiResource.isLoading}
      isOpen={isCreateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput
            label="Name"
            name="name"
            placeholder="e.g., Coffee Power"
            feedback={findErrorByName(createApiResource.error, "name")}
            value={param.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Description"
            name="description"
            placeholder="e.g., 100 grams, with free spoon"
            feedback={findErrorByName(createApiResource.error, "description")}
            value={param.description}
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
            feedback={findErrorByName(createApiResource.error, "category_id", "category")}
            value={param.category_id}
            onChange={handleChange}
            onRender={(option) => ProductCategory.toCategory(option)}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Quantity"
            name="quantity"
            placeholder="e.g., 75"
            feedback={findErrorByName(createApiResource.error,"quantity")}
            value={param.quantity}
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
            feedback={findErrorByName(createApiResource.error, "srp")}
            value={param.srp}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput
            label="Member Price"
            name="member_price"
            placeholder="e.g., 90.00"
            feedback={findErrorByName(createApiResource.error, "member_price")}
            value={param.member_price}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateModal