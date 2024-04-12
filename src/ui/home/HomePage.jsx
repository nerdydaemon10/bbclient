import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../redux/authSlice.jsx"
import { Route, Routes, useNavigate } from "react-router-dom"

import "./Dashboard.css"
import Dashboard from "./Dashboard.jsx"
import PosView from "./pos/PosView.jsx"
import OrdersView from "./orders/OrdersView.jsx"
import InventoryView from "./inventory/InventoryView.jsx"
import CustomersView from "./customers/CustomersView.jsx"

function HomePage() {
  return (
    <Dashboard>
      <Routes>
        <Route exact path="/" element={<PosView />} />
        <Route path="/inventory" element={<InventoryView />} />
        <Route path="/orders" element={<OrdersView />} />
        <Route path="/customers" element={<CustomersView />} />
        <Route path="/sign-out" element={<SignOut />} />
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

export default HomePage