import {
  BiBarChartAlt2, BiBox, BiCartAlt, BiGroup, BiHome, 
  BiShoppingBag, BiSolidBarChartAlt2, BiSolidBox, 
  BiSolidCartAlt, BiSolidGroup, BiSolidHome, 
  BiSolidShoppingBag, BiSolidUserCircle, BiUserCircle,
} from "react-icons/bi"

export const RoutesData = [
  {
    key: "admin",
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