/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect, useState } from "react"

import { DELAY_MILLIS, ProductCategoriesData } from "../../../util/Config.jsx"
import { findErrorByName } from "../../../util/helpers/FormHelper.jsx"
import { createProductAsync, resetStates, toggleModal } from "../../redux/inventorySlice.js"
import { enqueueSnackbar } from "notistack"
import { FormModal, FormSelectInput, FormTextFieldInput } from "../../common"
import ModalType from "../../../util/classes/ModalType.jsx"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { InventoryContext } from "./InventoryProvider.jsx"

const defaultParam = {
  name: "",
  description: "",
  category_id: ProductCategoriesData[0].id,
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
    <FormModal 
      title="Create Product"
      isLoading={createApiResource.isLoading}
      isOpen={isCreateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <FormTextFieldInput
            label="Name"
            name="name"
            placeholder="e.g., Coffee Power"
            value={param.name}
            feedback={findErrorByName(createApiResource.error, "name")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
            label="Description"
            name="description"
            placeholder="e.g., 100 grams, with free spoon"
            value={param.description}
            feedback={findErrorByName(createApiResource.error, "description")}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <FormSelectInput
            label="Category"
            name="category_id"
            options={ProductCategoriesData}
            value={param.category_id}
            feedback={findErrorByName(createApiResource.error, "category_id", "category")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
            label="Quantity"
            name="quantity"
            placeholder="e.g., 75"
            value={param.quantity}
            feedback={findErrorByName(createApiResource.error,"quantity")}
            onChange={handleChange}
            />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <FormTextFieldInput 
            name="srp"
            label="SRP"
            placeholder="e.g., 80.00"
            value={param.srp}
            feedback={findErrorByName(createApiResource.error, "srp")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput
            label="Member Price" 
            name="member_price"
            placeholder="e.g., 90.00"
            value={param.member_price}
            feedback={findErrorByName(createApiResource.error, "member_price")}
            onChange={handleChange}
          />
        </div>
      </div>
    </FormModal>
  )
}

export default CreateModal