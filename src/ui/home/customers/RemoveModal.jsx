/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import { FormModal, Modal } from "../../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { removeCustomerAsync, resetStates, toggleModal } from "../../redux/customersSlice.js"
import ModalType from "../../../util/classes/ModalType.jsx"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { DELAY_MILLIS } from "../../../util/Config.jsx"

function RemoveModal() {
  const dispatch = useDispatch()

  const { isRemoveModalOpen, customer, removeApiResource } = useSelector((state) => state.customers)
  const { handleFetchCustomersAsync } = useContext(CustomersContext)
  
  const handleClose = () => {
    dispatch(toggleModal({modalType: ModalType.REMOVE, open: false}))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(removeCustomerAsync(customer.id))
  }
  
  useEffect(() => {
    if (removeApiResource.isSuccess) {
      dispatch(toggleModal({modalType: ModalType.REMOVE, open: false}))
      enqueueSnackbar(GenericMessage.CUSTOMER_REMOVED)
      handleFetchCustomersAsync()
      // reset all redux-action-states including success that trigger snackbar
      setTimeout(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [removeApiResource.isSuccess])

  return (
    <Modal  
      title="Remove Customer"
      isLoading={removeApiResource.isLoading}
      isOpen={isRemoveModalOpen} 
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