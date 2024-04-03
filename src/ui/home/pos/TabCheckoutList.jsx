import { BiMinus, BiPlus } from "react-icons/bi"
import StringHelper from "../../../utils/helpers/StringHelper.jsx"
import { useDispatch, useSelector } from "react-redux"
import { decrementQty, incrementQty } from "../../redux/pos/posSlice.jsx"

function TabCheckoutList() {
  const { checkouts } = useSelector((state) => state.pos)
  
  return (
    <ul className="tab-checkout-list">
      {
        checkouts.length > 0 ? (
          checkouts.map((checkout, index) => (
            <LICheckout key={index} checkout={checkout} />
          ))
        ) : (
          <li className="tab-checkout-list-item-status">
            <div>
              <h6 className="mb-0">Checkouts are empty.</h6>
              <p>Press &apos;checkout&apos; to add in check. list</p>
            </div>
          </li>
        )
      }
  </ul>
  )
}

function LICheckout({checkout}) {
  const name = checkout.name
  const description = checkout.description
  const total = StringHelper.toPesoCurrency(checkout.total)
  const quantity = checkout.quantity
  
  const dispatch = useDispatch()

  const handleDecrementClick = (id) => {
    dispatch(decrementQty(id))
  }

  const handleIncrementClick = (id) => {
    dispatch(incrementQty(id))
  }

  return (
    <li className="tab-checkout-list-item">
      <div>
        <p className="tab-checkout-list-item-name">{name}</p>
        <p className="tab-checkout-list-item-description">{description}</p>
        <p className="tab-checkout-list-item-total">
        {total}
        </p>
      </div>
      <div className="tab-checkout-list-item-qty-btn-group">
        <a
          className="tab-checkout-list-item-qty-btn-group-btn"
          type="button" 
          onClick={() => handleDecrementClick(checkout.id)}
        >
          <BiMinus />
        </a>
        <p className="tab-checkout-list-item-qty-btn-group-txt">{quantity}</p>
        <a 
          className="tab-checkout-list-item-qty-btn-group-btn"
          type="button"
          onClick={() => handleIncrementClick(checkout.id)}
        >
          <BiPlus />
        </a>
      </div>
    </li>
  )
}

export default TabCheckoutList