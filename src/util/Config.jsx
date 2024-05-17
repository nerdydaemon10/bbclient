import { 
  BiCheck, BiHourglass, BiQr, BiWallet, BiX,
  BiBarChartAlt2, BiBox, BiCartAlt, BiGroup, BiHome, 
  BiShoppingBag, BiSolidBarChartAlt2, BiSolidBox, 
  BiSolidCartAlt, BiSolidGroup, BiSolidHome, 
  BiSolidShoppingBag, BiSolidUserCircle, BiUserCircle,
  BiSolidCoffee,
  BiCoffee,
  BiMoney,
} from "react-icons/bi"

export const DELAY_MILLIS = 250
export const RoutesData = [
  {
    key: "dashboard",
    route: "",
    name: "Home Dashboard",
    icon: { active: <BiSolidHome />, inactive: <BiHome />},
    hasCounter: false
  },
  {
    key: "pos",
    route: "pos",
    name: "POS/Create Order",
    icon: { active: <BiSolidShoppingBag />, inactive: <BiShoppingBag />},
    hasCounter: false
  },
  {
    key: "sales",
    route: "sales",
    name: "Sales Report",
    icon: { active: <BiSolidBarChartAlt2 />, inactive: <BiBarChartAlt2 />},
    hasCounter: false
  },
  {
    key: "orders",
    route: "orders",
    name: "Orders",
    icon: { active: <BiSolidCartAlt />, inactive: <BiCartAlt />},
    hasCounter: true
  },
  {
    key: "inventory",
    route: "inventory",
    name: "Inventory",
    icon: { active: <BiSolidBox />, inactive: <BiBox />},
    hasCounter: true
  },
  {
    key: "customers",
    route: "customers",
    name: "Customers",
    icon: { active: <BiSolidGroup />, inactive: <BiGroup />},
    hasCounter: true
  },
  {
    key: "users",
    route: "users",
    name: "Users",
    icon: { active: <BiSolidUserCircle />, inactive: <BiUserCircle />},
    hasCounter: true
  },
]
export const ProductCategoriesData = [
  { key: 1, name: "Coffee Grounds" },
  { key: 2, name: "Syrup" },
  { key: 3, name: "Equipment" },
  { key: 4, name: "Category1" },
  { key: 5, name: "Category2" },
  { key: 6, name: "Category3" },
  { key: 7, name: "Category4" },
  { key: 8, name: "Category5" }
]
export const PaymentMethodsData = [
  {
    id: 1,
    name: "Cash",
    icon: <BiMoney className="me-1" />,
    value: 1
  },
  {
    id: 2,
    name: "COD",
    icon: <BiWallet className="me-2" />,
    value: 2
  }
]
export const StatusesData = [
  { key: "online", name: "Online", badge: "text-bg-dark", icon: <BiSolidCoffee /> },
  { key: "offline", name: "Offline", badge: "text-bg-light", icon: <BiCoffee /> },
]
export const OrderStatusesData = [
  { key: "pending", name: "Pending", badge: "text-bg-light", icon: <BiHourglass /> },
  { key: "approved", name: "Approved", badge: "text-bg-dark", icon: <BiCheck /> },
  { key: "rejected", name: "Rejected", badge: "text-bg-secondary", icon: <BiX /> }
]
export const RolesData = [
  { key: 1, name: "Admin", normalize: "admin" },
  { key: 2, name: "Employee", normalize: "employee" }
]
export const IntervalsData = [
  {
    id: 1,
    name: "Weekly",
    value: "weekly"
  },
  {
    id: 2,
    name: "Monthly",
    value: "monthly"
  },
  {
    id: 3,
    name: "Yearly",
    value: "yearly"
  }
]
export const paymentMethods = [1, 2]
export const rowsPerPages = [15, 50, 100]
export const orderStatuses = ["pending", "approved", "rejected"]
export const productCategories = [1, 2, 3, 4, 5, 6, 7, 8]