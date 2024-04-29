import { isEmpty } from "lodash"
import StringHelper from "../../../util/helpers/StringHelper.js"
import Button from "../buttons/Button.jsx"
import CheckoutListStyle from "./CheckoutListStyle.jsx"
import { BiMinus, BiPlus } from "react-icons/bi"

function CheckoutList({className, checkouts, onDecrement, onIncrement}) {
  return (
    <>
      <CheckoutListStyle />
      <ul className={`checkout-list list-unstyled m-0 gap-2 ${className}`}>
        {
          isEmpty(checkouts) ? (
            <EmptyItem />
          ) : (
            checkouts.map((checkout, index) => (
              <CheckoutItem 
                key={index} 
                checkout={checkout}
                onDecrement={() => onDecrement(checkout.id)} 
                onIncrement={() => onIncrement(checkout.id)} 
              />
            ))
          )
        }
      </ul>
    </>
  )
}
function CheckoutItem({checkout,  onDecrement, onIncrement}) {
  const name = StringHelper.truncate(checkout.name)
  const description = StringHelper.truncate(checkout.description)
  const total = StringHelper.toPesoCurrency(checkout.srp * checkout.quantity)
  const quantity = StringHelper.toPcs(checkout.quantity)
  
  return (
    <li className="checkout-list-item d-flex flex-row justify-content-between border rounded p-2">
      <div className="d-flex flex-column justify-content-between">
        <div>
          <h6 className="text-body-primary fw-semibold mb-0">{name}</h6>
          <p className="text-body-secondary fs-7 mb-0">{description}</p>
        </div>
        <div className="hstack">
          <span className="fs-7 fw-semibold">{`${total}, ${quantity}`}</span>
        </div>
      </div>
      <QuantityControls
        quantity={checkout.quantity}
        onDecrement={onDecrement} 
        onIncrement={onIncrement} 
      />
    </li>
  )
}
function EmptyItem() {
  return (
    <li className="w-100 h-100 d-flex justify-content-center align-items-center text-center">
      <div>
        <h6 className="text-body-primary mb-0">Checkouts are empty.</h6>
        <p className="text-body-secondary fs-7">Press <em>&apos;checkout&apos;</em> to some products.</p>
      </div>
    </li>
  )
}
function QuantityControls({quantity, onDecrement, onIncrement}) {
  return (
    <div className="checkout-list-qty-controls vstack text-center">
      <Button
        variant="dark"
        size="sm"
        onClick={onDecrement}
      >
        <BiMinus />
      </Button>
      <span className="fw-medium">{quantity}</span>
      <Button 
        variant="dark"
        size="sm"
        onClick={onIncrement}
      >
        <BiPlus />
      </Button>
    </div>
  )
}

export default CheckoutList