import { useContext, useEffect } from "react"
import AppPrimaryButton from "../../components/buttons/AppPrimaryButton.jsx"
import PosContext from "./PosContext.jsx"
import { useDispatch, useSelector } from "react-redux"
import { cleanupSomeStates, createOrderAsync } from "../../redux/pos/posSlice.jsx"
import UiStatus from "../../../utils/classes/UiStatus.jsx"
import { enqueueSnackbar } from "notistack"

function PlaceOrderBtnContainer() {
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
  }, [status, message, dispatch, error])

  return (
    <div className="place-order-btn-container">
      <AppPrimaryButton 
        text="Place Order"
        status={status}
        fullWidth={true}
        disabled={isPlaceOrderBtnDisabled}
        onClick={handleClick}
      />
    </div>
  )
}

export default PlaceOrderBtnContainer