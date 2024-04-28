/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import { Modal, TextFieldInput } from "../../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { closeModal, resetStates, setCustomer, updateCustomer } from "../../redux/customersSlice.js"
import ModalType from "../../../util/classes/ModalType.js"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { DELAY_MILLIS } from "../../../util/Config.jsx"
import { findErrorByName } from "../../../util/helper.jsx"

function UpdateModal() {
  const dispatch = useDispatch()

  const { customer, update } = useSelector((state) => state.customers)
  const { isOpen, response } = update
  const { fetchCustomers } = useContext(CustomersContext)

  const handleClose = () => {
    dispatch(closeModal(ModalType.UPDATE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(updateCustomer(customer))
  }

  const handleChange = (e) => {
    dispatch(setCustomer({...customer, [e.target.name]: e.target.value}))
  }
  
  // success 
  useEffect(() => {
    if (response.isSuccess) {
      dispatch(closeModal(ModalType.UPDATE))
      enqueueSnackbar(GenericMessage.CUSTOMER_UPDATED)
      fetchCustomers()
      setTimeout(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [response.isSuccess])

  return (
    <Modal  
      title="Create Customer"
      isLoading={response.isLoading}
      isOpen={isOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <div className="row mb-2">
        <div className="col-6">
          <TextFieldInput
            label="Full Name"
            name="full_name"
            placeholder="e.g., Juan Dela Cruz"
            feedback={findErrorByName(response.error, "full_name")}
            value={customer.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Address"
            name="address"
            placeholder="e.g., Brgy. 143, Quezon City"
            feedback={findErrorByName(response.error, "address")}
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
            feedback={findErrorByName(response.error, "phone_number")}
            value={customer.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Email Address"
            name="email_address"
            placeholder="e.g., juandelacruz@gmail.com"
            feedback={findErrorByName(response.error, "email_address")}
            value={customer.email_address}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default UpdateModal