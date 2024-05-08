/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { debounce } from "lodash"
import { DELAY_MILLIS } from "../../util/Config.jsx"
import { useFetchSalesQuery } from "../../data/services/sales.js"

const SalesContext = createContext()

function SalesProvider({children}) {
  const { sq } = useSelector((state) => state.sales)
  const [sqtemp, setSqtemp] = useState(sq)

  const { isLoading, isFetching, data, error } = useFetchSalesQuery(sqtemp)
  
  const debouncer = useCallback(debounce((sqtemp) => {
    setSqtemp(sqtemp)
  }, DELAY_MILLIS), [])

  useEffect(() => {
    debouncer(sq)
  }, [sq])

  return (
    <SalesContext.Provider value={{
      isLoading,
      isFetching,
      data,
      error
    }}>
      {children}
    </SalesContext.Provider>
  )
}

export { SalesContext }
export default SalesProvider