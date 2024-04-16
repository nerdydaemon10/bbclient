import { computeProduct, hasCheckouts } from "./Util.jsx"
import { useDispatch } from "react-redux"
import { decrementQty, incrementQty } from "../../redux/posSlice.jsx"
import QuantityButton from "./QuantityButton.jsx"
import StringHelper from "../../../utils/helpers/StringHelper.jsx"

function CheckoutList({checkouts}) {
  const dispatch = useDispatch()

  const handleDecrement = (id) => {
    dispatch(decrementQty(id))
  }
  const handleIncrement = (id) => {
    dispatch(incrementQty(id))
  }

  return (
    <ul className="checkout-list">
      {
        hasCheckouts(checkouts) ? (
          checkouts.map((checkout, index) => (
            <CheckoutItem
              key={index}
              checkout={checkout}
              onDecrement={() => handleDecrement(checkout.id)} 
              onIncrement={() => handleIncrement(checkout.id)} 
            />
          ))
        ) : ( 
          <EmptyItem /> 
        )
      }
    </ul>
  )
}

function CheckoutItem({checkout, onDecrement, onIncrement}) {
  return (
    <li className="checkout-list-item d-flex flex-row justify-content-between">
      <div className="d-flex flex-column justify-content-between">
        <div>
          <p className="checkout-list-item-name">{StringHelper.truncate(checkout.name)}</p>
          <p className="checkout-list-item-description">{StringHelper.truncate(checkout.description)}</p>
        </div>
        <p className="checkout-list-item-meta">
          {`${StringHelper.toPesoCurrency(computeProduct(checkout))},
            ${StringHelper.toPcs(checkout.quantity)}`}
        </p>
      </div>
      <QuantityButton 
        quantity={checkout.quantity} 
        onDecrement={onDecrement} 
        onIncrement={onIncrement} 
      />
    </li>
  )
}

function EmptyItem() {
  return (
    <li className="checkout-list-item-empty">
      <div>
        <h6 className="mb-0">Checkouts are empty.</h6>
        <p>Press &apos;checkout&apos; to add in checkouts.</p>
      </div>
    </li>
  )
}

export default CheckoutList