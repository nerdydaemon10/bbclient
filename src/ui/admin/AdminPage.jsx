import { Route, Routes } from "react-router-dom"
import { Dashboard, SignOut } from "../common/index.jsx"
import InventoryView from "../dashboard/inventory/InventoryView.jsx"
import CustomersView from "../customers/CustomersView.jsx"
import HomeView from "../dashboard/default/HomeView.jsx"
import { RoutesData } from "./Util.jsx"
import PosView from "../dashboard/pos/PosView.jsx"
import OrdersView from "./orders/OrdersView.jsx"
import CheckoutsView from "../checkouts/CheckoutsView.jsx"
import SalesView from "../sales/SalesView.jsx"
import EmployeesView from "../employees/EmployeesView.jsx"

function AdminPage() {
	return (
		<Dashboard routesData={RoutesData}>
			<Routes>
        <Route exact path="/" element={<HomeView />} />
				<Route path="pos" element={<PosView />} />
        <Route path="sales/*" element={
					<Routes>
						<Route exact path="/" element={<SalesView />} />
						<Route exact path="checkouts" element={<CheckoutsView />} />
					</Routes>
				} />
        <Route path="inventory" element={<InventoryView />} />
        <Route path="orders" element={<OrdersView />} />
        <Route path="customers" element={<CustomersView />} />
				<Route path="employees" element={<EmployeesView />} />
        <Route path="sign-out" element={<SignOut />} />
			</Routes>
		</Dashboard>
	)
}

export default AdminPage