/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../common"
import { resetStates } from "../../redux/customersSlice.js"
import ModalType from "../../../util/classes/ModalType.js"
import { closeModal, rejectOrder } from "../../redux/ordersSlice.js"
import { useContext, useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import { OrdersContext } from "./OrdersProvider.jsx"
import { DELAY_MILLIS } from "../../../util/Config.jsx"
import { delay } from "lodash"
import GenericMessage from "../../../util/classes/GenericMessage.js"

function RejectModal() {
  const { reject, order } = useSelector((state) => state.orders)
  const { isOpen, response } = reject
  
  const { fetchOrders } = useContext(OrdersContext)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModal(ModalType.REJECT))
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    dispatch(rejectOrder(order.id))
  }

  useEffect(() => {
    if (!response.isSuccess) return

    dispatch(closeModal(ModalType.REJECT))
    enqueueSnackbar(GenericMessage.ORDER_REJECTED)
    fetchOrders()
    delay(() => dispatch(resetStates()), DELAY_MILLIS)
  }, [response.isSuccess])

  return (
    <Modal  
      title="Reject Order"
      isLoading={response.isLoading}
      isOpen={isOpen} 
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