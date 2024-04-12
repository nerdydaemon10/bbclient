/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect } from "react"
import { FormModal } from "../../common"
import { CustomersContext } from "./CustomersProvider.jsx"
import { enqueueSnackbar } from "notistack"
import { removeCustomerAsync, resetStates, toggleModal } from "../../redux/customersSlice.jsx"
import ModalType from "../../../utils/classes/ModalType.jsx"
import GenericMessage from "../../../utils/classes/GenericMessage.jsx"
import { DELAY_MILLIS } from "../../../utils/Config.jsx"

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
    <FormModal  
      title="Remove Customer"
      isLoading={removeApiResource.isLoading}
      isOpen={isRemoveModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <p className="app-modal-body-text">
        Do you want to remove <b>{customer.full_name}</b> from the records?
      </p>
    </FormModal>
  )
}

export default RemoveModal