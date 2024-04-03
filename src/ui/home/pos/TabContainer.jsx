import TabOrderInfo from "./TabOrderInfo.jsx"
import TabCheckoutList from "./TabCheckoutList.jsx"
import TabCheckoutTotalContainer from "./TabCheckoutTotalContainer.jsx"
import { useContext } from "react"
import PosContext from "./PosContext.jsx"

function TabContainer({customer, paymentMethod, onCustomerChange, onPaymentMethodChange}) {
  const { tab } = useContext(PosContext)
  
  return (
    <div className={`tab-container ${tab}`}>
      {
        tab === "is-checkout-list" ? (
          <TabCheckoutListWrapper />
        ) : tab === "is-order-info" ? (
          <TabOrderInfo
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