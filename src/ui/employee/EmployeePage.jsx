import { Route, Routes, useNavigate } from "react-router-dom"
import { Dashboard } from "../common/index.jsx"
import { DashboardItems } from "./Util.jsx"
import PosView from "../pos/PosView.jsx"
import OrdersView from "./orders/OrdersView.jsx"
import CustomersView from "../customers/CustomersView.jsx"
import InventoryView from "../inventory/InventoryView.jsx"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import store from "../redux/store.js"
import { employees } from "../../data/services/employees.js"
import HomeView from "./home/HomeView.jsx"

function EmployeePage() {
	const navigate = useNavigate()
	const isAuthorized = useSelector((state) => state.auth.isAuthorized)

	useEffect(() => {
		if (!isAuthorized) navigate("/")
	}, [isAuthorized, navigate])

	//store.dispatch(employees.endpoints.fetchEmployees.initiate())

	return (
		<Dashboard items={DashboardItems}>
			<Routes>
        <Route exact path="/" element={<HomeView />} />
				<Route path="pos" element={<PosView />} />
        <Route path="inventory" element={<InventoryView />} />
        <Route path="orders" element={<OrdersView />} />
        <Route path="customers" element={<CustomersView />} />
			</Routes>
		</Dashboard>
	)
}

export default EmployeePage