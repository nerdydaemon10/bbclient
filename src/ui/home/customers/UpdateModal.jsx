/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { findErrorByName } from "../../../util/helpers/FormHelper.jsx"
import { useContext, useEffect } from "react"
import { FormModal, FormTextFieldInput, Modal, TextFieldInput } from "../../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { resetStates, setCustomer, toggleModal, updateCustomerAsync } from "../../redux/customersSlice.js"
import ModalType from "../../../util/classes/ModalType.jsx"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { DELAY_MILLIS } from "../../../util/Config.jsx"

function UpdateModal() {
  const dispatch = useDispatch()

  const { isUpdateModalOpen, customer, updateApiResource } = useSelector((state) => state.customers)
  const { handleFetchCustomersAsync } = useContext(CustomersContext)

  const handleClose = () => {
    dispatch(toggleModal({modalType: ModalType.UPDATE, open: false}))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(updateCustomerAsync(customer))
  }

  const handleChange = (e) => {
    dispatch(setCustomer({...customer, [e.target.name]: e.target.value}))
  }
  
  // success 
  useEffect(() => {
    if (updateApiResource.isSuccess) {
      dispatch(toggleModal({modalType: ModalType.UPDATE, open: false}))
      enqueueSnackbar(GenericMessage.CUSTOMER_UPDATED)
      handleFetchCustomersAsync()
      // reset all redux-action-states including success that trigger snackbar
      setTimeout(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [updateApiResource.isSuccess])

  return (
    <Modal  
      title="Create Customer"
      isLoading={updateApiResource.isLoading}
      isOpen={isUpdateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput
            label="Full Name"
            name="full_name"
            placeholder="e.g., Juan Dela Cruz"
            feedback={findErrorByName(updateApiResource.error, "full_name")}
            value={customer.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Address"
            name="address"
            placeholder="e.g., Brgy. 143, Quezon City"
            feedback={findErrorByName(updateApiResource.error, "address")}
            value={customer.address}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput
            label="Phone Number"
            name="phone_number"
            placeholder="e.g., 0945665634943"
            feedback={findErrorByName(updateApiResource.error, "phone_number")}
            value={customer.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Email Address"
            name="email_address"
            placeholder="e.g., juandelacruz@gmail.com"
            feedback={findErrorByName(updateApiResource.error, "email_address")}
            value={customer.email_address}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default UpdateModal