import { Route, Router, Routes } from "react-router-dom"
import AppDashboardLayout from "../../layouts/AppDashboardLayout.jsx"
import PointOfSaleView from "./views/PointOfSaleView.jsx"
import InventoryView from "./views/InventoryView.jsx"
import "../../layouts/AppDashboardLayout.css"

function HomePage() {
  return (
    <>
      <AppDashboardLayout>
      <Routes>
        <Route exact path="/" element={<PointOfSaleView />} />
        <Route path="/inventory" element={<InventoryView />} />
      </Routes>
      </AppDashboardLayout>
    </>
  )
}

export default HomePage