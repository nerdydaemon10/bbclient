import PosTabCheckoutList from "./PosTabCheckoutList.jsx"
import PosTabOrderInfo from "./PosTabOrderInfo.jsx"

function PosTabContainer({tab, customer, paymentMethod, onCustomerChange, onPaymentMethodChange}) {
  return (
    <div className={`pos-tab-container ${tab}`}>
      {
        tab === "is-checkout-list" ? (
          <PosTabCheckoutList />
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
export default PosTabContainer