import { BiCart, BiCoffee, BiHome, BiSolidCart, BiSolidCoffee, BiSolidHome, BiSolidStore, BiSolidUser, BiStore, BiUser } from "react-icons/bi"

export const sidebarItems = [
  {
    route: "/",
    label: "Home Dashboard",
    icon: { active: <BiSolidHome />, inactive: <BiHome />},
    hasCounter: false
  },
  {
    route: "/home",
    label: "POS System",
    icon: { active: <BiSolidStore />, inactive: <BiStore />},
    hasCounter: false
  },
  {
    route: "/home/inventory",
    label: "Inventory",
    icon: { active: <BiSolidCoffee />, inactive: <BiCoffee />},
    hasCounter: true
  },
  {
    route: "/home/orders",
    label: "Orders",
    icon: { active: <BiSolidCart />, inactive: <BiCart />},
    hasCounter: true
  },
  {
    route: "/home/customers",
    label: "Customers",
    icon: { active: <BiSolidUser />, inactive: <BiUser />},
    hasCounter: true
  }
]

export function compareRoute(route, current) {
  const lastIndex = current.lastIndexOf("/")
  const isLastIndex = (lastIndex === current.length - 1) && (lastIndex !== 0)
  const formattedRoute = isLastIndex ? current.substring(0, lastIndex) : current

  return formattedRoute === route
}