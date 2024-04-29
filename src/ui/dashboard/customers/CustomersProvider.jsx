/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { createContext, useEffect, useState } from "react"
import { CustomerService } from "../../../data/services"
import { setFulfilled, setPending, setRejected } from "../../redux/customersSlice.js"

const VITE_DELAY = import.meta.env.VITE_DELAY
const CustomersContext = createContext()

function CustomersProvider({children}) {
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
  }, VITE_DELAY)

  useEffect(() => {
    searchCustomers(sq)
  }, [sq])

  return (
    <CustomersContext.Provider value={{
      fetchCustomers,
      searchCustomers
    }}>
      {children}
    </CustomersContext.Provider>
  )
}

export { CustomersContext }
export default CustomersProvider