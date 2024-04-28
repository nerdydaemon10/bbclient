/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import { Modal } from "../../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { closeModal, removeCustomer, resetStates } from "../../redux/customersSlice.js"
import ModalType from "../../../util/classes/ModalType.js"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { DELAY_MILLIS } from "../../../util/Config.jsx"
import { delay } from "lodash"

function RemoveModal() {
  const dispatch = useDispatch()
  
  const { remove, customer } = useSelector((state) => state.customers)
  const { isOpen, response } = remove
  const { fetchCustomers } = useContext(CustomersContext)
  
  const handleClose = () => {
    dispatch(closeModal(ModalType.REMOVE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(removeCustomer(customer.id))
  }

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(closeModal(ModalType.REMOVE))
      enqueueSnackbar(GenericMessage.CUSTOMER_REMOVED)
      fetchCustomers()
      delay(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [response.isSuccess])

  return (
    <Modal  
      title="Remove Customer"
      isLoading={response.isLoading}
      isOpen={isOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <span className="text-body-secondary fs-7">
        Do you want to remove <b>&apos;{customer.full_name}&apos;</b> from the records?
      </span>
    </Modal>
  )
}

export default RemoveModal