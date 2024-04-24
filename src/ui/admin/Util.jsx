import { 
  BiBarChartAlt2, BiBox, BiCartAlt, BiGroup, BiHome, 
  BiShoppingBag, BiSolidBarChartAlt2, BiSolidBox, 
  BiSolidCartAlt, BiSolidGroup, BiSolidHome, 
  BiSolidShoppingBag, BiSolidUserCircle, BiUserCircle 
} from "react-icons/bi"

export const SidebarItems = [
  {
    route: "/admin",
    label: "Home Dashboard",
    icon: { active: <BiSolidHome />, inactive: <BiHome />},
    hasCounter: false
  },
  {
    route: "/admin/pos",
    label: "POS/Create Order",
    icon: { active: <BiSolidShoppingBag />, inactive: <BiShoppingBag />},
    hasCounter: false
  },
  {
    route: "/admin/sales",
    label: "Sales Report",
    icon: { active: <BiSolidBarChartAlt2 />, inactive: <BiBarChartAlt2 />},
    hasCounter: false
  },
  {
    route: "/admin/orders",
    label: "Orders",
    icon: { active: <BiSolidCartAlt />, inactive: <BiCartAlt />},
    hasCounter: true
  },
  {
    route: "/admin/inventory",
    label: "Inventory",
    icon: { active: <BiSolidBox />, inactive: <BiBox />},
    hasCounter: true
  },
  {
    route: "/admin/customers",
    label: "Customers",
    icon: { active: <BiSolidGroup />, inactive: <BiGroup />},
    hasCounter: true
  },
  {
    route: "/admin/users",
    label: "Users",
    icon: { active: <BiSolidUserCircle />, inactive: <BiUserCircle />},
    hasCounter: true
  },
]