/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { findErrorByName } from "../../../utils/helpers/FormHelper.jsx"
import { useContext, useEffect } from "react"
import { FormModal, FormTextFieldInput } from "../../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { resetStates, setCustomer, toggleModal, updateCustomerAsync } from "../../redux/customersSlice.jsx"
import ModalType from "../../../utils/classes/ModalType.jsx"
import GenericMessage from "../../../utils/classes/GenericMessage.jsx"
import { DELAY_MILLIS } from "../../../utils/Config.jsx"

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
    <FormModal  
      title="Create Customer"
      isLoading={updateApiResource.isLoading}
      isOpen={isUpdateModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <FormTextFieldInput 
            name="full_name"
            label="Full Name"
            placeholder="e.g., Juan Dela Cruz"
            value={customer.full_name}
            feedback={findErrorByName(updateApiResource.error, "full_name")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
            name="address"
            label="Address"
            placeholder="e.g., Brgy. 143, Quezon City"
            value={customer.address}
            feedback={findErrorByName(updateApiResource.error, "address")}
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
            value={customer.phone_number}
            feedback={findErrorByName(updateApiResource.error, "phone_number")}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormTextFieldInput 
            label="Email Address"
            name="email_address"
            placeholder="e.g., juandelacruz@gmail.com"
            value={customer.email_address}
            feedback={findErrorByName(updateApiResource.error, "email_address")}
            onChange={handleChange}
          />
        </div>
      </div>
    </FormModal>
  )
}

export default UpdateModal