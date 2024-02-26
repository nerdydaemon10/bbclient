import "./AppDashboardLayout.css"
import AppDashboardSidebar from "../components/dashboard/AppDashboardSidebar.jsx"
import AppDashboardNavbar from "../components/dashboard/AppDashboardNavbar.jsx"

function AppDashboardLayout({children}) {
  return (
    <div className="app-dashboard">
      <AppDashboardSidebar />
      <div className="app-dashboard-main">
        <AppDashboardNavbar />
        <div className="app-dashboard-main-content">
          {children}
        </div>
      </div>
    </div>  
  )
}

export default AppDashboardLayout