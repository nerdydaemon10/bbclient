import { createContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { posTabs } from "./Util.jsx"

const PosContext = createContext()

function PosProvder({children}) {
  const { checkouts } = useSelector((state) => state.pos)
  
  const [tab, setTab] = useState(posTabs[0].value)
  const [customer, setCustomer] = useState({
    name: "",
    contactNumber: "",
    deliveryAddress: ""
  })
  const [paymentMethod, setPaymentMethod] = useState(1)
  const [proofOfPayment, setProofOfPayment] = useState("")
  const [isPlaceOrderBtnDisabled, setIsPlaceOrderBtnDisabled] = useState(false)

  useEffect(() => {
    const checkoutsEmpty = checkouts.length == 0
    //const someOrderFieldsAreEmpty = Object.entries(customer).some(([, v]) => v.trim().length == 0)
    //const proofOfPaymentEmpty = paymentMethod == PaymentMethod.SCAN_TO_PAY && StringHelper.isEmpty(proofOfPayment)

    setIsPlaceOrderBtnDisabled(
      checkoutsEmpty/* || 
      someOrderFieldsAreEmpty || 
      proofOfPaymentEmpty*/
    )
  }, [checkouts, customer, paymentMethod, proofOfPayment])

  return (
    <PosContext.Provider value={{
      checkouts, 
      tab, setTab, 
      customer, setCustomer, 
      paymentMethod, setPaymentMethod,
      proofOfPayment, setProofOfPayment,
      isPlaceOrderBtnDisabled
    }}>
      {children}
    </PosContext.Provider>
  )
}

export { PosContext }
export default PosProvder