import {
  BiBox, BiCartAlt, BiGroup, BiHome, 
  BiShoppingBag, BiSolidBox, BiSolidCartAlt, 
  BiSolidGroup, BiSolidHome, BiSolidShoppingBag
} from "react-icons/bi"

export const RoutesData = [
  {
    key: "employee",
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
  }
]