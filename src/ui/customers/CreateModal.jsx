/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Modal, TextFieldInput } from "../common"
import { enqueueSnackbar } from "notistack"
import { closeModal } from "../redux/customersSlice.js"
import { ModalType, GenericMessage } from "../../util/classes"
import { useCreateCustomerMutation } from "../../data/services/customers.js"
import InputHelper from "../../util/helpers/InputHelper.js"
import { CustomerParam } from "../../util/params.js"

function CreateModal() {
  const [createCustomer, { isLoading, isSuccess, error }] = useCreateCustomerMutation()
  const { isCreateModalOpen } = useSelector((state) => state.customers)
  const [customer, setCustomer] = useState(CustomerParam)
  const dispatch = useDispatch()

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
    setCustomer(CustomerParam)
  }, [isSuccess])

  return (
    <Modal  
      title="Create Customer"
      isLoading={isLoading}
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
            feedback={InputHelper.getErrorByName(error, "full_name")}
            value={customer.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Address"
            name="address"
            placeholder="e.g., Brgy. 143, Quezon City"
            feedback={InputHelper.getErrorByName(error, "address")}
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
            feedback={InputHelper.getErrorByName(error, "phone_number")}
            value={customer.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Email Address"
            name="email_address"
            placeholder="e.g., juandelacruz@gmail.com"
            feedback={InputHelper.getErrorByName(error, "email_address")}
            value={customer.email_address}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateModal