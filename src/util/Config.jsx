import { BiCheck, BiHourglass, BiQr, BiWallet, BiX } from "react-icons/bi"
import { first } from "lodash"
import ResponseStatus from "./classes/ResponseStatus.js"

export const DELAY_MILLIS = 250

export const ProductCategoriesData = [
  { key: 1, name: "Beverages" },
  { key: 2, name: "Powder" },
  { key: 3, name: "Dairy" },
  { key: 4, name: "Goods" }
]
export const PaymentMethodsData = [
  {
    id: 1,
    name: "Cash-On-Delivery",
    icon: <BiWallet className="me-1" />,
    value: 1
  },
  {
    id: 2,
    name: "Scan-To-Pay",
    icon: <BiQr className="me-2" />,
    value: 2
  }
]
export const OrderStatusesData = [
  { key: "pending", name: "Pending", badge: "text-bg-light", icon: <BiHourglass /> },
  { key: "approved", name: "Approved", badge: "text-bg-dark", icon: <BiCheck /> },
  { key: "rejected", name: "Rejected", badge: "text-bg-secondary", icon: <BiX /> }
]
export const RolesData = [
  { key: 1, name: "Admin", enum: "admin" },
  { key: 2, name: "Employee", enum: "employee" }
]
export const paymentMethods = [1, 2]
export const rowsPerPages = [15, 50, 100]
export const orderStatuses = ["pending", "approved", "rejected"]
export const productCategories = [1, 2, 3, 4]
export const buildSq = () => {
  return {
    per_page: first(rowsPerPages),
    page: 1
  }
}
export const buildResponse = (state=ResponseStatus.IDLE, payload=null) => {
  if (state == ResponseStatus.PENDING)
    return { isLoading: true, isSuccess: false, data: null, error: null }
  if (state == ResponseStatus.FULFILLED)
    return { isLoading: false, isSuccess: true, data: payload, error: null }
  if (state == ResponseStatus.REJECTED)
    return { isLoading: false, isSuccess: false, data: null, error: payload }
  // Idle
  return { isLoading: false, isSuccess: false, data: null, error: null }
}
export const buildColResponse = (state=ResponseStatus.IDLE, payload=null) => {
  if (state == ResponseStatus.PENDING)
    return { isLoading: true, data: [], meta: { current_page: 0, last_page: 0 }, error: null }
  if (state == ResponseStatus.FULFILLED)
    return { isLoading: false, data: payload.data, meta: payload.meta, error: null }
  if (state == ResponseStatus.REJECTED)
    return { isLoading: false, data: [], meta: { current_page: 0, last_page: 0 }, error: payload }
  // Idle
  return { isLoading: false, data: [], meta: { current_page: 0, last_page: 0 }, error: null }
}