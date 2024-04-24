import { Route, Routes, useNavigate } from "react-router-dom"
import { Dashboard } from "../common"
import { SidebarItems } from "./Util.jsx"
import PosView from "../home/pos/PosView.jsx"
import InventoryView from "../home/inventory/InventoryView.jsx"
import OrdersView from "../home/orders/OrdersView.jsx"
import CustomersView from "../home/customers/CustomersView.jsx"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { logout } from "../redux/authSlice.js"
import SalesView from "../sales/SalesView.jsx"

function AdminPage() {
	return (
		<Dashboard sidebarItems={SidebarItems}>
			<Routes>
        <Route exact path="/" element={<h1>hello</h1>} />
				<Route path="pos" element={<PosView />} />
        <Route path="sales" element={<SalesView />} />
        <Route path="inventory" element={<InventoryView />} />
        <Route path="orders" element={<OrdersView />} />
        <Route path="customers" element={<CustomersView />} />
        <Route path="sign-out" element={<SignOut />} />
			</Routes>
		</Dashboard>
	)
}

function SignOut() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logout())
    navigate("/")
  }, [dispatch, navigate])
}

export default AdminPage