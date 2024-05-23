import { isEmpty } from "lodash"
import Button from "../buttons/Button.jsx"
import CheckoutListStyle from "./CheckoutListStyle.jsx"
import { BiMinus, BiPlus } from "react-icons/bi"
import ProductCategory from "../../../util/classes/ProductCategory.js"
import { toPeso, toQty, truncate } from "../../../util/helper.js"
import React from "react"

function CheckoutList({className, checkouts, isControlsDisabled, isOdd, onDecrement, onIncrement}) {
  return (
    <React.Fragment>
      <CheckoutListStyle />
      <ul className={`checkout-list list-unstyled m-0 gap-2 ${className}`}>
        {
          isEmpty(checkouts) ? (
            <EmptyItem />
          ) : (
            checkouts.map((checkout, index) => (
              <CheckoutItem 
                key={index}
                count={index + 1}
                checkout={checkout}
                isControlsDisabled={isControlsDisabled}
                isOdd={isOdd}
                onDecrement={() => onDecrement(checkout.id)} 
                onIncrement={() => onIncrement(checkout.id)} 
              />
            ))
          )
        }
      </ul>
    </React.Fragment>
  )
}
function CheckoutItem({count, checkout, isControlsDisabled, isOdd=true, onDecrement, onIncrement}) {
  const name = truncate(checkout.name)
  const code = truncate(checkout.product_code)
  const srp = toPeso(checkout.srp)
  const category = ProductCategory.toCategory(checkout.category_id)
  const total = toPeso(checkout.srp * checkout.quantity)
  const quantity = toQty(checkout.quantity)
  
  return (
    <li className={`checkout-list-item ${isControlsDisabled ? "" : "d-flex flex-row justify-content-between gap-2"} border rounded ${isOdd ? "is-odd" : "is-even" } p-2`}>
      <div className="d-flex flex-column justify-content-between">
        <div className="mb-1">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h6 className="text-body-primary fw-semibold mb-0">{name}</h6>
            {isControlsDisabled && <h6 className="text-body-primary fw-semibold mb-0">#{count}</h6>}
          </div>
          <p className="text-body-secondary text-wrap fs-7 mb-0">{code}, {category}, {srp}</p>
        </div>
        <div className="hstack">
          <span className="fs-7 fw-semibold">{`${total}, ${quantity}`}</span>
        </div>
      </div>
      {
        isControlsDisabled || (
          <QuantityControls
            quantity={checkout.quantity}
            onDecrement={onDecrement} 
            onIncrement={onIncrement} 
          />
        )
      }
    </li>
  )
}
function EmptyItem() {
  return (
    <li className="w-100 h-100 d-flex justify-content-center align-items-center text-center p-2">
      <div>
        <h6 className="text-body-primary mb-0">Checkouts are empty</h6>
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