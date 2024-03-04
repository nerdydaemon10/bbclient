import { useDispatch } from "react-redux"
import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom"

import InventoryView from "./views/InventoryView.jsx"
import PointOfSaleView from "./views/PointOfSaleView.jsx"
import AppDashboardLayout from "../../layouts/AppDashboardLayout.jsx"
import { logout } from "../../redux/auth/authSlice.jsx"
import { useEffect } from "react"

function HomePage() {
  return (
    <>
      <AppDashboardLayout>
        <Routes>
          <Route exact path="/" element={<PointOfSaleView />} />
          <Route path="/inventory" element={<InventoryView />} />
          <Route path="/sign-out" element={<SignOut />} />
        </Routes>
      </AppDashboardLayout>
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