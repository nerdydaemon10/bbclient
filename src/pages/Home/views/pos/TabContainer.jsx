import PosTabOrderInfo from "./PosTabOrderInfo.jsx"
import TabCheckoutList from "./TabCheckoutList.jsx"
import TabCheckoutTotalContainer from "./TabCheckoutTotalContainer.jsx"

function TabContainer({tab, customer, paymentMethod, onCustomerChange, onPaymentMethodChange}) {
  return (
    <div className={`tab-container ${tab}`}>
      {
        tab === "is-checkout-list" ? (
          <TabCheckoutListWrapper />
        ) : tab === "is-order-info" ? (
          <PosTabOrderInfo
            customer={customer}
            paymentMethod={paymentMethod}
            onCustomerChange={onCustomerChange}
            onPaymentMethodChange={onPaymentMethodChange}
          />
        ) : <></>
      }
    </div>
  )
}

function TabCheckoutListWrapper() {
  return (
    <>
      <TabCheckoutList />
      <TabCheckoutTotalContainer />
    </>
  )
}

export default TabContainer