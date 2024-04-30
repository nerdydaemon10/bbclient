import {
  BiBarChartAlt2, BiBox, BiCartAlt, BiCheckboxChecked, BiGroup, BiHome, 
  BiPackage, 
  BiShoppingBag, BiSolidBarChartAlt2, BiSolidBox, 
  BiSolidCartAlt, BiSolidCheckboxChecked, BiSolidGroup, BiSolidHome, 
  BiSolidPackage, 
  BiSolidShoppingBag, BiSolidUserCircle, BiUserCircle,
} from "react-icons/bi"

export const RoutesData = [
  {
    key: "admin",
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
    key: "sales",
    route: "sales",
    name: "Sales Report",
    icon: { active: <BiSolidBarChartAlt2 />, inactive: <BiBarChartAlt2 />},
    hasCounter: false,
    isSidebarItem: true
  },
  {
    key: "checkouts",
    route: "checkouts",
    name: "Checkouts",
    icon: { active: <BiSolidPackage />, inactive: <BiPackage />},
    hasCounter: false,
    isSidebarItem: false
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
  },
  {
    key: "employees",
    route: "employees",
    name: "Employees",
    icon: { active: <BiSolidUserCircle />, inactive: <BiUserCircle />},
    hasCounter: true,
    isSidebarItem: true
  },
]