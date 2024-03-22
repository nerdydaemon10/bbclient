import { useContext } from "react"
import AppPrimaryButton from "../../../../components/buttons/AppPrimaryButton.jsx"
import PosContext from "../../../../contexts/PosContext.jsx"

function PlaceOrderBtnContainer() {
  const { isPlaceOrderBtnDisabled } = useContext(PosContext)
  
  return (
    <div className="place-order-btn-container">
      <AppPrimaryButton 
        text="Place Order"
        fullWidth={true}
        disabled={isPlaceOrderBtnDisabled}
      />
    </div>
  )
}

export default PlaceOrderBtnContainer