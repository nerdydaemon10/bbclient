import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { SlOptionsVertical } from "react-icons/sl"

import "./AppDashboardLayout.css"
import DashboardHelper from "../utils/helpers/DashboardHelper.jsx"
import DashboardSidebarItems from "../utils/configs/DashboardSidebarItems.jsx"

function AppDashboardLayout({children}) {
  const location = useLocation()
  const [currentRoute, setCurrentRoute] = useState(location.pathname)

  const handleSidebarItemClick = (id) => {
    setCurrentRoute(id)
  }
  
  return (
    <div className="app-dashboard">
      <AppDashboardSidebar 
        currentRoute={currentRoute}
        onClick={handleSidebarItemClick} 
      />
      <AppDashboardNavbar />
      {children}
    </div>
  )
}

function AppDashboardSidebar({currentRoute, onClick}) {
  return (
    <div className="app-dashboard-sidebar">
      <div className="app-dashboard-sidebar-header"></div>
      <div className="app-dashboard-sidebar-body">
        <ul className="app-dashboard-sidebar-body-items">
        {
          DashboardSidebarItems.map(item => 
            <li className="app-dashboard-sidebar-body-item" key={item.id}>
              <Link to={item.route} role="button"
                className={`
                  app-dashboard-sidebar-body-item-btn btn btn-block w-100 
                  ${DashboardHelper.isSelectedRoute(currentRoute, item.route)}
                `}
                onClick={() => onClick(item.route)}
              >
                <span className="app-dashboard-sidebar-body-item-icon">{item.icon}</span>
                {item.label}
                <span className="app-dashboard-sidebar-body-item-size">99+</span>
              </Link>
            </li>
          )
        }
        </ul>
      </div>
    </div>
  )
}

function AppDashboardNavbar() {
  return (
    <div className="app-dashboard-navbar">
      <button className="btn btn-secondary">
        <SlOptionsVertical />
      </button>
    </div>
  )
}

function AppDashboardMain({className, children}) {
  return (
    <div className={`app-dashboard-main ${className}`}>
      {children}
    </div>
  )
}

export { AppDashboardMain }
export default AppDashboardLayout