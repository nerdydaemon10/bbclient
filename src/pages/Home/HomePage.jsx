import { useDispatch } from "react-redux"
import { Toaster } from "react-hot-toast"
import { Route, Routes, useNavigate } from "react-router-dom"

import InventoryView from "./views/inventory/InventoryView.jsx"
import AppDashboardLayout from "../../layouts/AppDashboardLayout.jsx"
import { logout } from "../../redux/auth/authSlice.jsx"
import { useEffect } from "react"
import PosView from "./views/pos/POSView.jsx"

function HomePage() {
  return (
    <>
      <AppDashboardLayout>
        <Routes>
          <Route exact path="/" element={<PosView />} />
          <Route path="/inventory" element={<InventoryView />} />
          <Route path="/sign-out" element={<SignOut />} />
        </Routes>
      </AppDashboardLayout>
      <Toaster />
    </>
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