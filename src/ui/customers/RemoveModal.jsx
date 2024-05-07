/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Modal } from "../common"
import { enqueueSnackbar } from "notistack"
import { closeModal } from "../redux/customersSlice.js"
import ModalType from "../../util/classes/ModalType.js"
import GenericMessage from "../../util/classes/GenericMessage.js"
import { useRemoveCustomerMutation } from "../../data/services/customers.js"

function RemoveModal() {
  const dispatch = useDispatch()

  const { customer, isRemoveModalOpen } = useSelector((state) => state.customers)
  const [removeCustomer, { isLoading, isSuccess }] = useRemoveCustomerMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.REMOVE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(removeCustomer(customer.id))
  }
  
  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.REMOVE))
    enqueueSnackbar(GenericMessage.CUSTOMER_REMOVED)
  }, [isSuccess])

  return (
    <Modal  
      title="Remove Customer"
      isLoading={isLoading}
      isOpen={isRemoveModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <span className="text-body-secondary fs-7">
        Do you want to remove <b>{customer.full_name}</b> from the records?
      </span>
    </Modal>
  )
}

export default RemoveModal