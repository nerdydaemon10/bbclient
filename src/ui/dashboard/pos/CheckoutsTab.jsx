import { Fragment } from "react"  
import { CheckoutList, ReceiptList } from "../../common/index.jsx"
import { useDispatch, useSelector } from "react-redux"
import { decrementQty, incrementQty } from "../../redux/posSlice.js"
import { computeCheckouts, toPeso } from "../../../util/helper"

function CheckoutsTab() {
  const { checkouts } = useSelector((state) => state.pos)
  const total = computeCheckouts(checkouts)
  const dispatch = useDispatch()

  const handleDecrement = (id) => {
    dispatch(decrementQty(id))
  }
  const handleIncrement = (id) => {
    dispatch(incrementQty(id))
  }

  return (
    <Fragment>
      <CheckoutList
        checkouts={checkouts} 
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
      <ReceiptList
        receipts={[{
          name: "Total", 
          value: toPeso(total)
        }]}
      />
    </Fragment>
  )
}

export default CheckoutsTab