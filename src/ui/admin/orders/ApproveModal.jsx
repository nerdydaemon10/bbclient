
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../common"
import ModalType from "../../../util/classes/ModalType.js"
import { closeModal } from "../../redux/ordersSlice.js"
import { useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { useApproveOrderMutation } from "../../../data/services/orders.js"
import { isNil } from "lodash"

function ApproveModal() {
  const dispatch = useDispatch()
  const { modifyOrder, isApproveModalOpen } = useSelector((state) => state.orders)
  const [approveOrder, { isLoading, isSuccess }] = useApproveOrderMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.APPROVE))
  }
  
  const handleConfirm = (e) => {
    e.preventDefault()
    approveOrder(modifyOrder.id)
  }

  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.APPROVE))
    enqueueSnackbar(GenericMessage.ORDER_APPROVED)
  }, [isSuccess, dispatch])

  if (isNil(modifyOrder)) return
  
  return (
    <Modal
      title="Approve Order"
      isOpen={isApproveModalOpen} 
      isLoading={isLoading}
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <span className="text-body-secondary fs-7">
        Do you want to approve order <b>#{modifyOrder.reference_number}</b>?
      </span>
    </Modal>
  )
}

export default ApproveModal