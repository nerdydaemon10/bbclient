import AppFormTextField from "../../../../components/forms/AppFormTextField.jsx"
import { findErrorByName } from "../../../../utils/helpers/FormHelper.jsx"
import AppFormOption from "../../../../components/forms/AppFormOption.jsx"
import { useContext, useState } from "react"
import PosContext from "../../../../contexts/PosContext.jsx"
import AppFormFile from "../../../../components/forms/AppFormFile.jsx"
import PaymentMethods from "../../../../utils/configs/PaymentMethods.jsx"
import PaymentMethod from "../../../../utils/classes/PaymentMethod.jsx"

function TabOrderInfo() {
  const { customer, setCustomer, paymentMethod, setPaymentMethod, proofOfPayment, setProofOfPayment  } = useContext(PosContext)

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }
  
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  const handleProofOfPaymentChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProofOfPayment(file)
    }
  }

  return (
    <div className="tab-order-info app-sy-12">
      <AppFormTextField
        name="name" 
        label="Customer's Name"
        placeholder="Customer Name..."
        value={customer.name}
        feedback={findErrorByName(null, "")}
        onChange={handleCustomerChange}
      />
      <AppFormTextField
        name="contactNumber" 
        label="Customer's Contact Number"
        placeholder="Contact Number..."
        value={customer.contactNumber}
        feedback={findErrorByName(null, "")}
        onChange={handleCustomerChange}
      />
      <AppFormTextField
        name="deliveryAddress" 
        label="Customer's Delivery Address"
        placeholder="Delivery Address..."
        value={customer.deliveryAddress}
        feedback={findErrorByName(null, "")}
        onChange={handleCustomerChange}
      />
      <AppFormOption 
        name="paymentMethod"
        label="Payment Method"
        items={PaymentMethods}
        value={paymentMethod}
        onChange={handlePaymentMethodChange}
      />
    </div>
  )
}

function Test() {
  const { paymentMethod, setPaymentMethod, proofOfPayment, setProofOfPayment  } = useContext(PosContext)

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }
  
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  const handleProofOfPaymentChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProofOfPayment(file)
    }
  }

  return (
    <>
      {
        paymentMethod == PaymentMethod.SCAN_TO_PAY && (
          <AppFormFile 
            name="proofOfPayment"
            label="Proof of Payment"
            placeholder="Upload a Photo"
            feedback={findErrorByName(null, "")}
            value={proofOfPayment}
            onChange={handleProofOfPaymentChange}
          />
        )
      }
    </>
  )
}

export default TabOrderInfo