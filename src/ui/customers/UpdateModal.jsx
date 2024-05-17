/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Modal, TextFieldInput } from "../common"
import { enqueueSnackbar } from "notistack"
import { closeModal, setCustomer } from "../redux/customersSlice.js"
import ModalType from "../../util/classes/ModalType.js"
import GenericMessage from "../../util/classes/GenericMessage.js"
import { useUpdateCustomerMutation } from "../../data/services/customers.js"
import { getErrorByName } from "../../util/helper.js"

function UpdateModal() {
  const dispatch = useDispatch()

  const [updateCustomer, { isLoading, isSuccess, error }] = useUpdateCustomerMutation()
  const { customer, isUpdateModalOpen } = useSelector((state) => state.customers)

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

  useEffect(() => {
    if (!isSuccess) return
    
      dispatch(closeModal(ModalType.UPDATE))
      enqueueSnackbar(GenericMessage.CUSTOMER_UPDATED)
  }, [isSuccess])

  return (
    <Modal  
      title="Create Customer"
      isLoading={isLoading}
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
            feedback={getErrorByName(error, "full_name")}
            value={customer.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Address"
            name="address"
            placeholder="e.g., Brgy. 143, Quezon City"
            feedback={getErrorByName(error, "address")}
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
            feedback={getErrorByName(error, "phone_number")}
            value={customer.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Email Address"
            name="email_address"
            placeholder="e.g., juandelacruz@gmail.com"
            feedback={getErrorByName(error, "email_address")}
            value={customer.email_address}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default UpdateModal