import { BiMinus, BiPlus } from "react-icons/bi";

function QuantityButton({quantity, onDecrement, onIncrement}) {
  return (
    <div className="qty-group">
      <a 
        className="qty-group-btn"
        role="button" 
        onClick={onDecrement}
      >
        <BiMinus />
      </a>
      <span className="qty-group-txt">{quantity}</span>
      <a 
        className="qty-group-btn"
        role="button" 
        onClick={onIncrement}
      >
        <BiPlus />
      </a>
    </div>
  )
}

export default QuantityButton