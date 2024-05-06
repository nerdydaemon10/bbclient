/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect, useState } from "react"
import { Modal, TextFieldInput } from "../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { closeModal, createCustomer, resetStates } from "../redux/customersSlice.js"
import { ModalType, GenericMessage } from "../../util/classes"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { findErrorByName } from "../../util/helper.jsx"
import { delay } from "lodash"

const buildParam = () => {
  return {
    full_name: "",
    address: "",
    phone_number: "",
    email_address: ""
  }
}

function CreateModal() {
  const dispatch = useDispatch()
  
  const { create } = useSelector((state) => state.customers)
  const { isOpen, response } = create
  const { fetchCustomers } = useContext(CustomersContext)
  
  const [param, setParam] = useState(buildParam())

  const handleClose = () => {
    dispatch(closeModal(ModalType.CREATE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(createCustomer(param))
  }

  const handleChange = (e) => {
    setParam({ ...param, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(closeModal(ModalType.CREATE))
      enqueueSnackbar(GenericMessage.CUSTOMER_ADDED)
      fetchCustomers()
      setParam(buildParam())
      delay(() => dispatch(resetStates()), DELAY_MILLIS)
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
            value={param.full_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Address"
            name="address"
            placeholder="e.g., Brgy. 143, Quezon City"
            feedback={findErrorByName(response.error, "address")}
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
            placeholder="e.g., 0945665634943"
            feedback={findErrorByName(response.error, "phone_number")}
            value={param.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextFieldInput 
            label="Email Address"
            name="email_address"
            placeholder="e.g., juandelacruz@gmail.com"
            feedback={findErrorByName(response.error, "email_address")}
            value={param.email_address}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateModal