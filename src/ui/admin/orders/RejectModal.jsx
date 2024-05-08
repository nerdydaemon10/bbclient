/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../common"
import ModalType from "../../../util/classes/ModalType.js"
import { closeModal } from "../../redux/ordersSlice.js"
import { useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { useRejectOrderMutation } from "../../../data/services/orders.js"

function RejectModal() {
  const dispatch = useDispatch()
  const { order, isRejectModalOpen } = useSelector((state) => state.orders)
  const [rejectOrder, { isLoading, isSuccess }] = useRejectOrderMutation()

  const handleClose = () => {
    dispatch(closeModal(ModalType.REJECT))
  }
  
  const handleConfirm = (e) => {
    e.preventDefault()
    rejectOrder(order.id)
  }

  useEffect(() => {
    if (!isSuccess) return

    dispatch(closeModal(ModalType.REJECT))
    enqueueSnackbar(GenericMessage.ORDER_REJECTED)
  }, [isSuccess, dispatch])

  return (
    <Modal  
      title="Reject Order"
      isOpen={isRejectModalOpen} 
      isLoading={isLoading}
      onClose={handleClose}
      onConfirm={handleConfirm}
    >
      <span className="text-body-secondary fs-7">
        Do you want to reject order <b>#{order.reference_number}</b>?
      </span>
    </Modal>
  )
}

export default RejectModal