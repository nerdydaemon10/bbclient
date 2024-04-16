/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { findErrorByName } from "../../../utils/helpers/FormHelper.jsx"
import { useContext, useEffect, useState } from "react"
import { FormModal, FormTextFieldInput } from "../../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { createCustomerAsync, resetStates, toggleModal } from "../../redux/customersSlice.jsx"
import ModalType from "../../../utils/classes/ModalType.jsx"
import GenericMessage from "../../../utils/classes/GenericMessage.jsx"
import { DELAY_MILLIS } from "../../../utils/Config.jsx"

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
    <FormModal  
      title="Create Customer"
      isLoading={createApiResource.isLoading}
      isOpen={isCreateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <FormTextFieldInput 
            name="full_name"
            label="Full Name"
            placeholder="e.g., Juan Dela Cruz"
            value={param.full_name}
            feedback={findErrorByName(createApiResource.error, "full_name")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
            name="address"
            label="Address"
            placeholder="e.g., Brgy. 143, Quezon City"
            value={param.address}
            feedback={findErrorByName(createApiResource.error, "address")}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <FormTextFieldInput
            label="Phone Number"
            name="phone_number"
            placeholder="e.g., 0945665634943"
            value={param.phone_number}
            feedback={findErrorByName(createApiResource.error, "phone_number")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
            label="Email Address"
            name="email_address"
            placeholder="e.g., juandelacruz@gmail.com"
            value={param.email_address}
            feedback={findErrorByName(createApiResource.error, "email_address")}
            onChange={handleChange}
          />
        </div>
      </div>
    </FormModal>
  )
}

export default CreateModal