/* eslint-disable react-hooks/exhaustive-deps */
import { OptionInput, PrimaryButton } from "../../common/index.jsx"
import { computeSum, hasIncompleteDetails, tabs } from "./Util.jsx"
import CheckoutList from "./CheckoutList.jsx"
import CustomerDetails from "./CustomerDetails.jsx"
import { useDispatch, useSelector } from "react-redux"
import StringHelper from "../../../util/helpers/StringHelper.js"
import { createOrder, resetStates, setTab } from "../../redux/posSlice.js"
import { useContext, useEffect } from "react"
import { enqueueSnackbar } from "notistack"
import GenericMessage from "../../../util/classes/GenericMessage.js"
import { PosContext } from "./PosProvider.jsx"
import { DELAY_MILLIS } from "../../../util/Config.jsx"

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
        options={tabs}
        value={tab}
        onChange={(value) => onTabChange(value)}
      />
    </div>
  )
}

function TabContainer({tab, checkouts, customer}) {
  return (
    <div className={`tab-container ${tab}`}>
      {
        tab === "is-checkouts" ? (
          <>
            <CheckoutList checkouts={checkouts} />
            <CheckoutDetails checkouts={checkouts} />
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

function CheckoutDetails({checkouts}) {  
  const total = StringHelper.toPesoCurrency(computeSum(checkouts))

  return (
    <div className="checkout-details">
      <div className="checkout-details-item">
        <h6 className="checkout-details-item-name">Total</h6>
        <p className="checkout-details-item-value">{total}</p>
      </div>
    </div>
  )
}

function PlaceOrderButton({isLoading, checkouts, customer, onClick}) {
  return (
    <div className="place-order-btn-container">
      <PrimaryButton 
        isLoading={isLoading}
        isFullWidth={true}
        isDisabled={hasIncompleteDetails(checkouts, customer)}
        onClick={onClick}
      > 
        Place Order
      </PrimaryButton>
    </div>
  )
}

export default OrderDetails