/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash"
import { createContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { setResError, setResLoading, setResSuccess } from "../redux/salesSlice.js"
import { SaleService } from "../../data/services"

export const SalesContext = createContext()

function SalesProvider({children}) {
  const { sq } = useSelector((state) => state.sales)
  const dispatch = useDispatch()

  const fetchSales = (sq) => {
    dispatch(setResLoading())

    SaleService
    .findAll(sq)
    .then((response) => dispatch(setResSuccess(response)))
    .catch((error) => dispatch(setResError(error)))
  }

  const searchSales = debounce((sq) => {
    fetchSales(sq)
  }, DELAY_MILLIS)

  useEffect(() => {
    searchSales(sq)
  }, [sq])
  
  return (
    <SalesContext.Provider value={{
      fetchSales,
      searchSales
    }}>
      {children}
    </SalesContext.Provider>
  )
}

export default SalesProvider