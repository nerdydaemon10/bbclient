import { BiCheck, BiDotsHorizontal, BiDotsVertical, BiHourglass, BiQr, BiWallet, BiX } from "react-icons/bi"

export const DELAY_MILLIS = 500

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
  { id: 1, name: "Admin" },
  { id: 2, name: "Employee "}
]
export const paymentMethods = [1, 2]
export const rowsPerPages = [15, 50, 100]
export const orderStatuses = ["pending", "approved", "rejected"]
export const productCategories = [1, 2, 3, 4]