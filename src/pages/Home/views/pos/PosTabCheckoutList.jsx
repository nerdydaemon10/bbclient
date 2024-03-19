import { BiMinus, BiPlus } from "react-icons/bi"
import StringHelper from "../../../../utils/helpers/StringHelper.jsx"
import { useDispatch, useSelector } from "react-redux"
import { decrementQty, incrementQty } from "../../../../redux/pos/posSlice.jsx"

function PosTabCheckoutList() {
  const { checkouts, total } = useSelector((state) => state.pos)

  return (
    <>
      <ul className="pos-tab-checkout-list">
        {
          checkouts.length > 0 ? (
            checkouts.map((checkout, index) => (
              <LICheckout key={index} checkout={checkout} />
            ))
          ) : (
            <li className="pos-tab-checkout-list-item-status w-100 h-100 d-flex justify-content-center align-items-center p-1">
              <div>
                <h6 className="mb-0">Checkouts are empty.</h6>
                <p>Press &apos;checkout&apos; to add in check. list</p>
              </div>
            </li>
          )
        }
      </ul>
      <div className="pos-tab-checkout-info">
        <div className="pos-tab-checkout-info-item">
          <h6 className="pos-tab-checkout-info-item-name">Total</h6>
          <p className="pos-tab-checkout-info-item-value">{StringHelper.toPesoCurrency(total)}</p>
        </div>
      </div>
    </>
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
    <li className="pos-tab-checkout-list-item">
      <div>
        <p className="pos-tab-checkout-list-item-name">{name}</p>
        <p className="pos-tab-checkout-list-item-description">{description}</p>
        <p className="pos-tab-checkout-list-item-total-price">
        {total}
        </p>
      </div>
      <div className="pos-tab-checkout-list-item-qty-btn-group">
        <a
          className="pos-tab-checkout-list-item-qty-btn-group-btn"
          type="button" 
          onClick={() => handleDecrementClick(checkout.id)}
        >
          <BiMinus />
        </a>
        <p className="pos-tab-checkout-list-item-qty-btn-group-txt">{quantity}</p>
        <a 
          className="pos-tab-checkout-list-item-qty-btn-group-btn"
          type="button"
          onClick={() => handleIncrementClick(checkout.id)}
        >
          <BiPlus />
        </a>
      </div>
    </li>
  )
}

export default PosTabCheckoutList