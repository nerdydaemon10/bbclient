/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { removeProductAsync, resetStates, toggleModal } from "../../redux/inventorySlice.js"
import { useContext, useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import { FormModal } from "../../common/index.jsx"
import { InventoryContext } from "./InventoryProvider.jsx"
import ModalType from "../../../util/classes/ModalType.jsx"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { DELAY_MILLIS } from "../../../util/Config.jsx"

function RemoveModal() {
  const dispatch = useDispatch()

  const { isRemoveModalOpen, product, removeApiResource } = useSelector((state) => state.inventory)
  const { handleFetchProductsAsync } = useContext(InventoryContext)

  const handleClose = () => {
    dispatch(toggleModal({modalType: ModalType.REMOVE, open: false}))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(removeProductAsync(product.id))
  }

  useEffect(() => {
    if (removeApiResource.isSuccess) {
      dispatch(toggleModal({modalType: ModalType.REMOVE, open: false}))
      enqueueSnackbar(GenericMessage.PRODUCT_REMOVED)
      handleFetchProductsAsync()
      // reset all redux-action-states including success that trigger snackbar
      setTimeout(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [removeApiResource.isSuccess])
  
  return (
    <FormModal  
      title="Remove Product"
      isLoading={removeApiResource.isLoading}
      isOpen={isRemoveModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <p className="app-modal-body-text">
        Do you want to remove <b>{product.name}</b> from the records?
      </p>
    </FormModal>
  )
}

export default RemoveModal