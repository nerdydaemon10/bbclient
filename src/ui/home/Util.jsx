import { BiCalculator, BiChart, BiGroup } from "react-icons/bi";
import { BiCabinet } from "react-icons/bi"
export const DashboardSidebarItems = [
  {
    id: 1,
    route: "/home",
    label: "POS System",
    icon: <BiCalculator size={20} />
  },
  {
    id: 2,
    route: "/home/inventory",
    label: "Inventory",
    icon: <BiCabinet size={20} />
  },
  {
    id: 3,
    route: "/home/orders",
    label: "Orders",
    icon: <BiChart size={20} />
  },
  {
    id: 4,
    route: "/home/customers",
    label: "Customers",
    icon: <BiGroup size={20} />
  },
]

export function isSelected(route, currentRoute) {
  const lastIndex = currentRoute.lastIndexOf("/")
  const isLastIndex = (lastIndex === currentRoute.length - 1) && (lastIndex !== 0)
  const formattedRoute = isLastIndex ? currentRoute.substring(0, lastIndex) : currentRoute

  return formattedRoute === route ? "btn-dark" : "btn-secondary"
}