import {
  BiBox, BiCartAlt, BiGroup, BiHome, 
  BiShoppingBag, BiSolidBox, BiSolidCartAlt, 
  BiSolidGroup, BiSolidHome, BiSolidShoppingBag
} from "react-icons/bi"

export const DashboardItems = [
  {
    key: "employee",
    route: "",
    name: "Home Dashboard",
    icon: { active: <BiSolidHome />, inactive: <BiHome />},
    hasCounter: false,
    isSidebarItem: true
  },
  {
    key: "pos",
    route: "pos",
    name: "POS/Create Order",
    icon: { active: <BiSolidShoppingBag />, inactive: <BiShoppingBag />},
    hasCounter: false,
    isSidebarItem: true
  },
  {
    key: "orders",
    route: "orders",
    name: "Orders",
    icon: { active: <BiSolidCartAlt />, inactive: <BiCartAlt />},
    hasCounter: true,
    isSidebarItem: true
  },
  {
    key: "inventory",
    route: "inventory",
    name: "Inventory",
    icon: { active: <BiSolidBox />, inactive: <BiBox />},
    hasCounter: true,
    isSidebarItem: true
  },
  {
    key: "customers",
    route: "customers",
    name: "Customers",
    icon: { active: <BiSolidGroup />, inactive: <BiGroup />},
    hasCounter: true,
    isSidebarItem: true
  }
]