/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Modal, TextFieldInput } from "../common"
import { enqueueSnackbar } from "notistack"
import { closeModal } from "../redux/customersSlice.js"
import { ModalType, GenericMessage } from "../../util/classes"
import { useCreateCustomerMutation } from "../../data/services/customers.js"
import { getErrorByName } from "../../util/helper.js"
import { CustomerDto } from "../../data/dto.js"

function CreateModal() {
  const dispatch = useDispatch()
  const [customer, setCustomer] = useState(CustomerDto)
  const { isCreateModalOpen } = useSelector((state) => state.customers)
  const [createCustomer, { isLoading, isSuccess, error }] = useCreateCustomerMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.CREATE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    createCustomer(customer)
  }
  
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.CREATE))
    enqueueSnackbar(GenericMessage.CUSTOMER_ADDED)
    setCustomer(CustomerDto)
  }, [isSuccess])

  return (
    <Modal  
      title="Create Customer"
      isOpen={isCreateModalOpen}
      isLoading={isLoading}
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
            name="email_address"
            value={customer.email_address}
            onChange={handleChange}
            label="Email Address"
            placeholder="e.g., juandelacruz@gmail.com"
            feedback={getErrorByName(error, "email_address")}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateModal