/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { debounce } from "lodash"
import { DELAY_MILLIS } from "../../../util/Config.jsx"
import { setFetchResponse } from "../../redux/posSlice.js"
import { CustomerService, ProductService } from "../../../data/services"
import FetchType from "../../../util/classes/FetchType.js"

const PosContext = createContext()

function PosProvider({children}) {
  const dispatch = useDispatch()
  const { products, customers } = useSelector((state) => state.pos)
  
  const fetchProducts = (searchQuery) => {
    dispatch(setFetchResponse({
      type: FetchType.PRODUCTS,
      isLoading: true,
      data: [], 
      meta: { current_page: 0, last_page: 0 },
      error: null
    }))
    ProductService.findAll(searchQuery).then((response) => {
      dispatch(setFetchResponse({
        type: FetchType.PRODUCTS,
        isLoading: false, 
        data: response.data, 
        meta: response.meta,
        error: null
      }))
    })
    .catch((error) => {
      dispatch(setFetchResponse({
        type: FetchType.PRODUCTS,
        isLoading: false,
        data: [], 
        meta: { current_page: 0, last_page: 0 },
        error: error
      }))
    })
  }
  const fetchCustomers = (searchQuery) => {
    dispatch(setFetchResponse({
      type: FetchType.CUSTOMERS,
      isLoading: true, 
      data: [], 
      meta: { current_page: 0, last_page: 0 },
      error: null
    }))
    CustomerService.findAll(searchQuery).then((response) => {
      dispatch(setFetchResponse({
        type: FetchType.CUSTOMERS,
        isLoading: false, 
        data: response.data, 
        meta: response.meta,
        error: null
      }))
    })
    .catch((error) => {
      dispatch(setFetchResponse({
        type: FetchType.CUSTOMERS,
        isLoading: false, 
        data: [], 
        meta: { current_page: 0, last_page: 0 },
        error: error
      }))
    })
  }

  const searchProducts = debounce((searchQuery) => {
    fetchProducts(searchQuery)
  }, DELAY_MILLIS)
  const searchCustomers = debounce((searchQuery) => {
    fetchCustomers(searchQuery)
  }, DELAY_MILLIS)

  useEffect(() => {
    searchProducts(products.searchQuery)
  }, [products.searchQuery])

  useEffect(() => {
    searchCustomers(customers.searchQuery)
  }, [customers.searchQuery])

  return (
    <PosContext.Provider value={{
      fetchProducts,
      searchProducts,
      searchCustomers
    }}>
      {children}
    </PosContext.Provider>
  )
}

export { PosContext }
export default PosProvider