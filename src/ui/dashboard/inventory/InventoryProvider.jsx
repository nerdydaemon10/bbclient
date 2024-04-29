/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash"
import { useSelector } from "react-redux"
import { createContext, useEffect, useState } from "react"

import { ProductService } from "../../../data/services"
import { DELAY_MILLIS } from "../../../util/Config.jsx"

const InventoryContext = createContext()

function InventoryProvider({children}) {
  const { searchQuery } = useSelector((state) => state.inventory)
  const [apiResource, setApiResource] = useState({
    isLoading: true,
    data: { data: [], meta: { current_page: 0, last_page: 0 }},
    meta: null,
    error: null
  })

  const handleFetchProductsAsync = () => {
    setApiResource({...apiResource, isLoading: true})
    ProductService.findAll(searchQuery).then((response) => {
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

  const handleSearchProductsAsync = debounce(() => {
    handleFetchProductsAsync()
  }, DELAY_MILLIS)

  useEffect(() => {
    handleSearchProductsAsync()
  }, [searchQuery])
  
  return (
    <InventoryContext.Provider value={{
      apiResource, 
      handleFetchProductsAsync,
      handleSearchProductsAsync
    }}>
      {children}
    </InventoryContext.Provider>
  )
}

export { InventoryContext }
export default InventoryProvider