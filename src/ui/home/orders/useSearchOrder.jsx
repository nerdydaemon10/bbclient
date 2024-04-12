/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { debounce } from "lodash"
import OrderService from "../../../data/services/OrderService.jsx"

function useSearchOrder() {
  const VITE_DELAY = import.meta.env.VITE_DELAY

  const [query, setQuery] = useState({
    transacted_by: "",
    status: "",
    page: 1,
    per_page: 15
  })
  const [resource, setResource] = useState({
    isLoading: false,
    data: null,
    error: null
  })
  
  const handleQueryChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value})
  }

  const handleSearchOrder = debounce(() => {
    setResource({...resource, isLoading: true})
    OrderService.findAll(query).then((response) => {
      setResource({
          isLoading: false,
          data: response.data,
          error: null
        })
      })
    .catch((error) => {
      setResource({
        isLoading: false,
        data: null,
        error: error
      })
    })
  }, VITE_DELAY)

  useEffect(() => {
    handleSearchOrder()
  }, [query])
  
  return { query, resource, handleSearchOrder, handleQueryChange }
}

export default useSearchOrder