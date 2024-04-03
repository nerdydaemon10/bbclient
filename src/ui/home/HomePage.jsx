import { useDispatch } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"

import "./Dashboard.css"
import Dashboard from "./Dashboard.jsx"
import PosView from "./pos/PosView.jsx"
import InventoryView from "./inventory/InventoryView.jsx"
import { logout } from "../redux/auth/authSlice.jsx"
import { useEffect } from "react"

function HomePage() {
  return (
    <Dashboard>
      <Routes>``
        <Route exact path="/" element={<PosView />} />
        <Route path="/inventory" element={<InventoryView />} />
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