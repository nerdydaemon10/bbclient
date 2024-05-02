/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CheckoutList, OptionInput, ReceiptList } from "../../common/index.jsx"
import { Tabs, hasIncompleteDetails } from "./Util.jsx"
import CustomerDetails from "./CustomerDetails.jsx"
import { useDispatch, useSelector } from "react-redux"
import { createOrder, decrementQty, incrementQty, resetStates, setTab } from "../../redux/posSlice.js"
import { useContext, useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { PosContext } from "./PosProvider.jsx"
import { DELAY_MILLIS } from "../../../util/Config.jsx"
import { computeSum } from "../../../util/helper.jsx"

function OrderDetails() {
  const dispatch = useDispatch()

  const { checkouts, tab, customer, createOrderResponse, paymentMethod } = useSelector((state) => state.pos)
  const { fetchProducts } = useContext(PosContext)

  const handleTabChange = (tab) => {
    dispatch(setTab(tab))
  }

  const handleClick  = () => {
    dispatch(createOrder({
      customer_id: customer.id,
      payment_method: paymentMethod,
      checkouts: checkouts
    }))
  }

  useEffect(() => {
    if (createOrderResponse.isSuccess) {
      enqueueSnackbar(GenericMessage.ORDER_ADDED)
      fetchProducts()
      // reset all redux-action-states including success that trigger snackbar
      setTimeout(() => dispatch(resetStates()), DELAY_MILLIS)
    }
  }, [createOrderResponse.isSuccess])
  
  return (
    <>
      <TabsContainer
        tab={tab}
        onTabChange={handleTabChange}
      />
      <TabContainer
        tab={tab}
        checkouts={checkouts}
        customer={customer}
      />
      <PlaceOrderButton
        isLoading={createOrderResponse.isLoading}
        checkouts={checkouts}
        customer={customer}
        onClick={handleClick} 
      />
    </>
  )
}

function TabsContainer({tab, onTabChange}) {
  return (
    <div className="tabs-container">
      <OptionInput
        name="tab"
        options={Tabs}
        value={tab}
        onChange={(value) => onTabChange(value)}
      />
    </div>
  )
}

function TabContainer({tab, checkouts, customer}) {
  const dispatch = useDispatch()

  const handleDecrement = (id) => {
    dispatch(decrementQty(id))
  }
  const handleIncrement = (id) => {
    dispatch(incrementQty(id))
  }

  return (
    <div className={`tab-container border rounded ${tab}`}>
      {
        tab === "is-checkouts" ? (
          <>
            <CheckoutList
              className="checkout-list" 
              checkouts={checkouts} 
              onDecrement={handleDecrement} 
              onIncrement={handleIncrement}
            />
            <ReceiptList 
              className="receipt-list" 
              receipts={[{name: "Total", value: computeSum(checkouts)}]
            } />
          </>
        ) : tab === "is-customer" ? (
          <CustomerDetails 
            customer={customer} 
          />
        ) : <></>
      }
    </div>
  )
}

function PlaceOrderButton({isLoading, checkouts, customer, onClick}) {
  return (
    <div className="place-order-btn-container">
      <Button
        isLoading={isLoading}
        isFullWidth={true}
        isDisabled={hasIncompleteDetails(checkouts, customer)}
        onClick={onClick}
      >
        Place Order
      </Button>
    </div>
  )
}

export default OrderDetails