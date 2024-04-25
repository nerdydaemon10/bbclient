/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { removeProductAsync, resetStates, toggleModal } from "../../redux/inventorySlice.js"
import { useContext, useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import { Modal } from "../../common/index.jsx"
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
    <Modal  
      title="Remove Product"
      isLoading={removeApiResource.isLoading}
      isOpen={isRemoveModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <span className="text-body-secondary fs-7">
        Do you want to remove <b>&apos;{product.name}&apos;</b> from the records?
      </span>
    </Modal>
  )
}

export default RemoveModal