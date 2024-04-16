import { OptionInput, PrimaryButton } from "../../common/index.jsx"
import { computeSum, hasIncompleteDetails, tabs } from "./Util.jsx"
import CheckoutList from "./CheckoutList.jsx"
import CustomerDetails from "./CustomerDetails.jsx"
import { useDispatch, useSelector } from "react-redux"
import StringHelper from "../../../utils/helpers/StringHelper.jsx"
import { createOrder, setTab } from "../../redux/posSlice.jsx"

function OrderDetails() {
  const dispatch = useDispatch()

  const { isProductsSelected, checkouts, tab, customer, createOrderResponse } = useSelector((state) => state.pos)

  const handleTabChange = (tab) => {
    dispatch(setTab(tab))
  }

  const handlePlaceOrderClick  = () => {
    dispatch(createOrder({
      customer_id: customer.id,
      checkouts: checkouts
    }))
  }
  
  return (
    <>
      <TabsContainer
        tab={tab}
        onTabChange={handleTabChange}
      />
      <TabContainer
        isProductsSelected={isProductsSelected}
        tab={tab}
        checkouts={checkouts}
        customer={customer}
      />
      <PlaceOrderButtonContainer
        isLoading={createOrderResponse.isLoading}
        isDisabled={hasIncompleteDetails(checkouts, customer)}
        onPlaceOrderClick={handlePlaceOrderClick} 
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

function TabContainer({isProductsSelected, tab, checkouts, customer}) {
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
            isProductsSelected={isProductsSelected}
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

function PlaceOrderButtonContainer({isLoading, isDisabled, onPlaceOrderClick}) {
  return (
    <div className="place-order-btn-container">
      <PrimaryButton 
        isLoading={isLoading}
        isFullWidth={true}
        isDisabled={isDisabled}
        onClick={onPlaceOrderClick}
      > 
        Place Order
      </PrimaryButton>
    </div>
  )
}

export default OrderDetails