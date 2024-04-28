/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { createContext, useEffect } from "react"
import { OrderService } from "../../../data/services"
import { setFulfilled, setPending, setRejected } from "../../redux/ordersSlice.js"

const VITE_DELAY = import.meta.env.VITE_DELAY
const OrdersContext = createContext()

function OrdersProvider({children}) {
  const dispatch = useDispatch()
  
  const { sq } = useSelector((state) => state.orders)

  const fetchOrders = () => {
    dispatch(setPending())
    
    OrderService
    .findAll(sq)
    .then((response) => dispatch(setFulfilled(response)))
    .catch((error) => dispatch(setRejected(error)))
  }
  
  const searchOrders = debounce(() => {
    fetchOrders()
  }, VITE_DELAY)

  useEffect(() => {
    fetchOrders()
  }, [sq])

  return (
    <OrdersContext.Provider value={{
      fetchOrders, 
      searchOrders
    }}>
      {children}
    </OrdersContext.Provider>
  )
}

export { OrdersContext }
export default OrdersProvider