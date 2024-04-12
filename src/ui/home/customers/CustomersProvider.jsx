/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash"
import { useSelector } from "react-redux"
import { createContext, useEffect, useState } from "react"
import CustomerService from "../../../data/services/CustomerService.jsx"

const VITE_DELAY = import.meta.env.VITE_DELAY
const CustomersContext = createContext()

function CustomersProvider({children}) {
  const { searchQuery } = useSelector((state) => state.customers)
  const [apiResource, setApiResource] = useState({
    isLoading: true,
    data: { data: [], meta: { current_page: 0, last_page: 0 }},
    meta: null,
    error: null
  })
  
  const handleFetchCustomersAsync = () => {
    setApiResource({...apiResource, isLoading: true})
    CustomerService.findAll(searchQuery).then((response) => {
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

  const handleSearchCustomerAsync = debounce(() => {
    handleFetchCustomersAsync()
  }, VITE_DELAY)

  useEffect(() => {
    handleSearchCustomerAsync()
  }, [searchQuery])

  return (
    <CustomersContext.Provider value={{
      apiResource,
      handleFetchCustomersAsync, 
      handleSearchCustomerAsync
    }}>
      {children}
    </CustomersContext.Provider>
  )
}

export { CustomersContext }
export default CustomersProvider