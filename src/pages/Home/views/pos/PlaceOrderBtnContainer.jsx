import { useContext, useEffect } from "react"
import AppPrimaryButton from "../../../../components/buttons/AppPrimaryButton.jsx"
import PosContext from "../../../../contexts/PosContext.jsx"
import { useDispatch, useSelector } from "react-redux"
import { createOrderAsync, resetState } from "../../../../redux/pos/posSlice.jsx"
import UiStatus from "../../../../utils/classes/UiStatus.jsx"
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
    }
    if (status == UiStatus.ERROR) {
      enqueueSnackbar(error.message)
    }
  }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => dispatch(resetState())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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