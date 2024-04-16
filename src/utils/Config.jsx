import { BiQr, BiWallet } from "react-icons/bi"

export const DELAY_MILLIS = 500
export const productCategories = [
  { id: 1, name: "Beverages" },
  { id: 2, name: "Powder" },
  { id: 3, name: "Dairy" },
  { id: 4, name: "Goods" }
]
export const paymentMethods = [
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
export const rowsPerPages = [
  {id: 15, name: "15 rows"},
  {id: 50, name: "50 rows"},
  {id: 100, name: "100 rows"}
]
export const orderStatuses = [
  { id: 1, name: "Pending" },
  { id: 2, name: "Approved" },
  { id: 3, name: "Rejected" }
]
export const _fetchApiResource = {
  isLoading: true, 
  data: { data: [], meta: { current_page: 0, last_page: 0 } }, 
  error: null
}