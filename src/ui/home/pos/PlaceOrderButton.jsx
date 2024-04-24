import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cleanupSomeStates, createOrderAsync } from "../../redux/posSlice.js"
import UiStatus from "../../../util/classes/UiStatus.jsx"
import { enqueueSnackbar } from "notistack"
import { PrimaryButton } from "../../common/index.jsx"
import { PosContext } from "./PosProvider.jsx"

function PlaceOrderButton() {
  const dispatch = useDispatch()
  
  const { createOrderResponse } = useSelector((state) => state.pos)
  const { status, message, error } = createOrderResponse
  const { isPlaceOrderBtnDisabled, checkouts, customer, paymentMethod } = useContext(PosContext)

  const handleClick = () => {
    dispatch(createOrderAsync({
      customer: [customer],
      payment_method: paymentMethod,
      checkouts: checkouts
    }))
  }
  
  useEffect(() => {
    if (status == UiStatus.SUCCESS) {
      enqueueSnackbar(message)
      dispatch(cleanupSomeStates())
    }
    if (status == UiStatus.ERROR) {
      enqueueSnackbar(error.message)
    }
  }, [status])

  return (
    <div className="place-order-btn-container">
      <PrimaryButton 
        status={status}
        isFullWidth={true}
        isDisabled={isPlaceOrderBtnDisabled}
        onClick={handleClick}
      > 
        Place Order
      </PrimaryButton>
    </div>
  )
}

export default PlaceOrderButton