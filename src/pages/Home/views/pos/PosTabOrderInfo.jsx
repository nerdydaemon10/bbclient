import { BiHome, BiMoney, BiQr, BiQrScan, BiWallet } from "react-icons/bi"
import AppFormTextField from "../../../../components/forms/AppFormTextField.jsx"
import { findErrorByName } from "../../../../utils/helpers/FormHelper.jsx"
import AppFormOption from "../../../../components/forms/AppFormOption.jsx"
import usePos from "./usePos.jsx"
import { useContext } from "react"
import { PosContext } from "./PosProvider.jsx"

const paymentMethods = [
  {
    id: 1,
    name: "Cash-On-Delivery",
    icon: <BiWallet className="me-1" />,
    value: 1
  },
  {
    id: 2,
    name: "Scan-To-Pay",
    icon: <BiQr className="me-2" />,
    value: 2
  }
]

function PosTabOrderInfo() {
  const { customer, paymentMethod, handleCustomerChange, handlePaymentMethodChange } = useContext(PosContext)
  
  return (
    <div className="pos-tab-order-info app-sy-12">
      <AppFormTextField
        name="name" 
        label="Customer's Name"
        placeholder="Customer Name..."
        value={customer.name}
        error={findErrorByName(null, "")}
        onChange={handleCustomerChange}
      />
      <AppFormTextField
        name="contactNumber" 
        label="Customer's Contact Number"
        placeholder="Contact Number..."
        value={customer.contactNumber}
        error={findErrorByName(null, "")}
        onChange={handleCustomerChange}
      />
      <AppFormTextField
        name="deliveryAddress" 
        label="Customer's Delivery Address"
        placeholder="Delivery Address..."
        value={customer.deliveryAddress}
        error={findErrorByName(null, "")}
        onChange={handleCustomerChange}
      />
      <AppFormOption 
        name="paymentMethod"
        label="Payment Method"
        items={paymentMethods}
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      />
    </div>
  )
}

export default PosTabOrderInfo