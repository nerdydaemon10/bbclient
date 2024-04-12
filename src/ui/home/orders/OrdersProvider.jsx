/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash"
import { useSelector } from "react-redux"
import { createContext, useEffect, useState } from "react"
import OrderService from "../../../data/services/OrderService.jsx"

const VITE_DELAY = import.meta.env.VITE_DELAY
const OrdersContext = createContext()

function OrdersProvider({children}) {
  const { searchQuery } = useSelector((state) => state.orders)
  const [apiResource, setApiResource] = useState({
    isLoading: true,
    data: { data: [], meta: { current_page: 0, last_page: 0 }},
    meta: null,
    error: null
  })
  
  const handleFetchOrdersAsync = () => {
    setApiResource({...apiResource, isLoading: true})
    OrderService.findAll(searchQuery).then((response) => {
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

  const handleSearchOrdersAsync = debounce(() => {
    handleFetchOrdersAsync()
  }, VITE_DELAY)

  useEffect(() => {
    handleSearchOrdersAsync()
  }, [searchQuery])

  return (
    <OrdersContext.Provider value={{
      apiResource,
      handleFetchOrdersAsync, 
      handleSearchOrdersAsync
    }}>
      {children}
    </OrdersContext.Provider>
  )
}

export { OrdersContext }
export default OrdersProvider