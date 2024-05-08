
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../common"
import ModalType from "../../../util/classes/ModalType.js"
import { closeModal } from "../../redux/ordersSlice.js"
import { useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { useApproveOrderMutation } from "../../../data/services/orders.js"

function ApproveModal() {
  const dispatch = useDispatch()
  const { order, isApproveModalOpen } = useSelector((state) => state.orders)
  const [approveOrder, { isLoading, isSuccess }] = useApproveOrderMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.APPROVE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    approveOrder(order.id)
  }

  useEffect(() => {
    if (!isSuccess) return
    
    dispatch(closeModal(ModalType.APPROVE))
    enqueueSnackbar(GenericMessage.ORDER_APPROVED)
  }, [isSuccess, dispatch])

  return (
    <Modal
      title="Approve Order"
      isOpen={isApproveModalOpen} 
      isLoading={isLoading}
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <span className="text-body-secondary fs-7">
        Do you want to approve order <b>#{order.reference_number}</b>?
      </span>
    </Modal>
  )
}

export default ApproveModal