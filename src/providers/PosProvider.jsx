import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PosContext from "../contexts/PosContext.jsx"
import AppCheckoutTabs from "../utils/configs/AppCheckoutTabs.jsx"

export default function PosProvder({children}) {
  const { checkouts } = useSelector((state) => state.pos)

  const [tab, setTab] = useState(AppCheckoutTabs[0].value)
  const [customer, setCustomer] = useState({
    name: "",
    contactNumber: "",
    deliveryAddress: ""
  })
  const [paymentMethod, setPaymentMethod] = useState(1)
  const [isCheckoutBtnDisabled, setIsCheckoutBtnDisabled] = useState(false)
  
  const handleTabChange = (id) => {
    setTab(id)
  }

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value)
  }

  useEffect(() => {
    const isCheckoutsEmpty = checkouts.length == 0
    const isSomeCustomerFieldsEmpty = Object.entries(customer).some(([, v]) => v.trim().length == 0)

    setIsCheckoutBtnDisabled(isCheckoutsEmpty || isSomeCustomerFieldsEmpty)
  }, [checkouts, customer])

  return (
    <PosContext.Provider value={{
      checkouts, 
      tab, 
      customer, 
      paymentMethod,
      isCheckoutBtnDisabled, 
      handleTabChange, 
      handleCustomerChange, 
      handlePaymentMethodChange 
    }}>
      {children}
    </PosContext.Provider>
  )
}