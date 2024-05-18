import { Route, Routes, useNavigate } from "react-router-dom"
import { Dashboard } from "../common/index.jsx"
import CustomersView from "../customers/CustomersView.jsx"
import HomeView from "../dashboard/default/HomeView.jsx"
import { RoutesData } from "./Util.jsx"
import PosView from "../dashboard/pos/PosView.jsx"
import OrdersView from "./orders/OrdersView.jsx"
import SalesView from "../sales/SalesView.jsx"
import EmployeesView from "../employees/EmployeesView.jsx"
import InventoryView from "../inventory/InventoryView.jsx"
import store from "../redux/store.js"
import { employees } from "../../data/services/employees.js"
import { useSelector } from "react-redux"
import { useEffect } from "react"

function AdminPage() {
	const isAuthorized = useSelector((state) => state.auth.isAuthorized)
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuthorized) return
		navigate("/")
	}, [isAuthorized, navigate])

	store.dispatch(employees.endpoints.fetchEmployees.initiate())
	
	return (
		<Dashboard routesData={RoutesData}>
			<Routes>
        <Route exact path="/" element={<HomeView />} />
				<Route path="pos" element={<PosView />} />
        <Route path="sales" element={<SalesView />} />
        <Route path="inventory" element={<InventoryView />} />
        <Route path="orders" element={<OrdersView />} />
        <Route path="customers" element={<CustomersView />} />
				<Route path="employees" element={<EmployeesView />} />
			</Routes>
		</Dashboard>
	)
}

export default AdminPage