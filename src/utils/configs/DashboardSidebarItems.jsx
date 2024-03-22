import { BiCalculator, BiCalendar, BiChart } from "react-icons/bi";
import { BiCabinet } from "react-icons/bi"

const DashboardSidebarItems = [
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
        route: "/home/transactions",
        label: "Transactions",
        icon: <BiChart size={20} />
    },
    {
        id: 4,
        route: "/home/trainings",
        label: "Trainings",
        icon: <BiCalendar size={20} />
    }
]

export default DashboardSidebarItems