import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BiFile, BiPackage } from "react-icons/bi"

const tabs = [
  {
    id: 1,
    name: "Check List",
    icon: <BiPackage className="me-1" size={18} />,
    value: "is-checkout-list"
  },
  {
    id: 2,
    name: "Order Info",
    icon: <BiFile className="me-1" size={18} />,
    value: "is-order-info"
  }
]

export default function usePos() {
  const { checkouts } = useSelector((state) => state.pos)

  const [tab, setTab] = useState(tabs[0].value)
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
    const isSomeCustomerFieldsEmpty = Object.entries(customer).some(([k, v]) => v.trim().length == 0)

    setIsCheckoutBtnDisabled(isCheckoutsEmpty || isSomeCustomerFieldsEmpty)
  }, [checkouts, customer])

  return { 
    checkouts, 
    tabs,
    tab, 
    customer, 
    paymentMethod,
    isCheckoutBtnDisabled, 
    handleTabChange, 
    handleCustomerChange, 
    handlePaymentMethodChange 
  }
}