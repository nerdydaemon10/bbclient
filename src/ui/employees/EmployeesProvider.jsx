/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { createContext, useEffect } from "react"
import { CustomerService } from "../../data/services/index.js"
import { setFulfilled, setPending, setRejected } from "../redux/customersSlice.js"
import { DELAY_MILLIS } from "../../util/Config.jsx"

const EmployeesContext = createContext()

function EmployeesProvider({children}) {
  const dispatch = useDispatch()

  const { sq } = useSelector((state) => state.customers)

  const fetchCustomers = (sq) => {
    dispatch(setPending())

    CustomerService
    .findAll(sq)
    .then((response) => dispatch(setFulfilled(response)))
    .catch((error) => dispatch(setRejected(error)))
  }

  const searchCustomers = debounce((sq) => {
    fetchCustomers(sq)
  }, DELAY_MILLIS)

  useEffect(() => {
    searchCustomers(sq)
  }, [sq])
  
  return (
    <EmployeesContext.Provider value={{
      fetchCustomers,
      searchCustomers
    }}>
      {children}
    </EmployeesContext.Provider>
  )
}

export { EmployeesContext }
export default EmployeesProvider