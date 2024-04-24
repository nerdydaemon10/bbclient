/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash"
import { useSelector } from "react-redux"
import { createContext, useEffect, useState } from "react"
import OrderService from "../../../data/services/OrderService.jsx"

const VITE_DELAY = import.meta.env.VITE_DELAY
const OrdersContext = createContext()

function OrdersProvider({children}) {
  const { sq } = useSelector((state) => state.orders)
  const [apiResource, setApiResource] = useState({
    isLoading: true,
    data: { data: [], meta: { current_page: 0, last_page: 0 }},
    meta: null,
    error: null
  })
  
  const fetchOrders = () => {
    setApiResource({...apiResource, isLoading: true})
    OrderService.findAll(sq).then((response) => {
      setApiResource({
          isLoading: false,
          data: response,
          error: null
        })
      })
    .catch((error) => {
      setApiResource({
        isLoading: false,
        data: { data: [], meta: { current_page: 0, last_page: 0 }},
        error: error
      })
    })
  }

  const searchOrders = debounce(() => {
    fetchOrders()
  }, VITE_DELAY)

  useEffect(() => {
    fetchOrders()
  }, [sq])

  return (
    <OrdersContext.Provider value={{
      apiResource,
      fetchOrders, 
      searchOrders
    }}>
      {children}
    </OrdersContext.Provider>
  )
}

export { OrdersContext }
export default OrdersProvider