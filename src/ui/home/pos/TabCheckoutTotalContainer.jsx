import StringHelper from "../../../utils/helpers/StringHelper.jsx"
import { useSelector } from "react-redux"

function TabCheckoutTotalContainer() {
  const { total } = useSelector((state) => state.pos)
  
  return (
    <div className="tab-checkout-total-container">
      <div className="tab-checkout-total-item">
        <h6 className="tab-checkout-total-item-name">Total</h6>
        <p className="tab-checkout-total-item-value">{StringHelper.toPeso(total)}</p>
      </div>
    </div>
  )
}

export default TabCheckoutTotalContainer