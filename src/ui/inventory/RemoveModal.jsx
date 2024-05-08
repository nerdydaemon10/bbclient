/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { closeModal } from "../redux/inventorySlice.js"
import { useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import { Modal } from "../common/index.jsx"
import ModalType from "../../util/classes/ModalType.js"
import GenericMessage from "../../util/classes/GenericMessage.js"
import { useRemoveProductMutation } from "../../data/services/products.js"

function RemoveModal() {
  const dispatch = useDispatch()
  const { product, isRemoveModalOpen } = useSelector((state) => state.inventory)
  const [removeProduct, { isLoading, isSuccess }] = useRemoveProductMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.REMOVE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(removeProduct(product.id))
  }

  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.REMOVE))
    enqueueSnackbar(GenericMessage.PRODUCT_REMOVED)
  }, [dispatch, isSuccess])
  
  return (
    <Modal  
      title="Remove Product"
      isLoading={isLoading}
      isOpen={isRemoveModalOpen} 
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <span className="text-body-secondary fs-7">
        Do you want to remove <b>{product.name}</b> from the records?
      </span>
    </Modal>
  )
}

export default RemoveModal