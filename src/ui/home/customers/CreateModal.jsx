/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { findErrorByName } from "../../../util/helpers/FormHelper.jsx"
import { useContext, useEffect, useState } from "react"
import { Modal, TextFieldInput } from "../../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { createCustomerAsync, resetStates, toggleModal } from "../../redux/customersSlice.js"
import ModalType from "../../../util/classes/ModalType.jsx"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { DELAY_MILLIS } from "../../../util/Config.jsx"

const defaultParam = {
  full_name: "",
  address: "",
  phone_number: "",
  email_address: ""
}

function CreateModal() {
  const dispatch = useDispatch()

  const { isCreateModalOpen, createApiResource } = useSelector((state) => state.customers)
  const { handleFetchCustomersAsync } = useContext(CustomersContext)

  const [param, setParam] = useState({ ...defaultParam })

  const handleClose = () => {
    dispatch(toggleModal({modalType: ModalType.CREATE, open: false}))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(createCustomerAsync(param))
  }

  const handleChange = (e) => {
    setParam({ ...param, [e.target.name]: e.target.value })
  }
  
  useEffect(() => {
    if (createApiResource.isSuccess) {
      dispatch(toggleModal({modalType: ModalType.CREATE, open: false}))
      enqueueSnackbar(GenericMessage.CUSTOMER_ADDED)
      handleFetchCustomersAsync()
      // reset param-state
      setParam({ ...defaultParam })
      // reset all redux-action-states including success that trigger snackbar
      setTimeout(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [createApiResource.isSuccess])

  return (
    <Modal  
      title="Create Customer"
      isLoading={createApiResource.isLoading}
      isOpen={isCreateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput 
            label="Full Name"
            name="full_name"
            placeholder="e.g., Juan Dela Cruz"
            feedback={findErrorByName(createApiResource.error, "full_name")}
            value={param.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Address"
            name="address"
            placeholder="e.g., Brgy. 143, Quezon City"
            feedback={findErrorByName(createApiResource.error, "address")}
            value={param.address}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput
            label="Phone Number"
            name="phone_number"
            placeholder="e.g., 09456563494"
            feedback={findErrorByName(createApiResource.error, "phone_number")}
            value={param.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Email Address"
            name="email_address"
            placeholder="e.g., juandelacruz@gmail.com"
            feedback={findErrorByName(createApiResource.error, "email_address")}
            value={param.email_address}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateModal