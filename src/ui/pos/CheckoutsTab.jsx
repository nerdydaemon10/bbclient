import { Fragment } from "react"  
import { CheckoutList, ReceiptList } from "../common/index.jsx"
import { useDispatch, useSelector } from "react-redux"
import { decrementQty, incrementQty, selectReceipts } from "../redux/posSlice.js"

function CheckoutsTab() {
  const checkouts = useSelector((state) => state.pos.checkouts)
  const receipts = useSelector(selectReceipts)
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
        receipts={receipts}
      />
    </Fragment>
  )
}

export default CheckoutsTab