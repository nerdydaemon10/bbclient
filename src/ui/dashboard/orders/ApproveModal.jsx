/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../common"
import ModalType from "../../../util/classes/ModalType.js"
import { approveOrder, closeModal, resetStates } from "../../redux/ordersSlice.js"
import { useContext, useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import { OrdersContext } from "./OrdersProvider.jsx"
import GenericMessage from "../../../util/classes/GenericMessage.js"

function ApproveModal() {
  const { approve, order } = useSelector((state) => state.orders)
  const { isOpen, response } = approve
  
  const { fetchOrders } = useContext(OrdersContext)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal(ModalType.APPROVE))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(approveOrder(order.id))
  }

  useEffect(() => {
    if (!response.isSuccess) return

    dispatch(closeModal(ModalType.APPROVE))
    enqueueSnackbar(GenericMessage.ORDER_APPROVED)
    fetchOrders()
    dispatch(resetStates())
  }, [response.isSuccess])

  return (
    <Modal  
      title="Approve Order"
      isLoading={response.isLoading}
      isOpen={isOpen} 
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