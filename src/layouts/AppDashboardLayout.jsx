import { useState } from "react"
import { Link } from "react-router-dom"

import StringHelper from "../utils/helpers/StringHelper.jsx"
import DashboardHelper from "../utils/helpers/DashboardHelper.jsx"
import AppDashboardNavbar from "../components/dashboard/AppDashboardNavbar.jsx"
import AppDashboardSidebarItems from "../utils/configs/AppDashboardSidebarItems.jsx"

function AppDashboardLayout({children}) {
  const [currentId, setCurrentId] = useState(1)

  const handleSidebarItemClick = (id) => {
    setCurrentId(id)
  }
  
  return (
    <div className="app-dashboard">
      <AppDashboardSidebar 
        currentId={currentId}
        onClick={handleSidebarItemClick} 
      />
      <div className="col app-dashboard-main">
        <AppDashboardNavbar />
        <div className="app-dashboard-main-content">{children}</div>
      </div>
    </div>
  )
}

function AppDashboardSidebar(props) {
  return (
    <div className="app-dashboard-sidebar">
      <div className="app-dashboard-sidebar-header"></div>
      <div className="app-dashboard-sidebar-body">
        <ul className="app-dashboard-sidebar-body-items">
          {
            AppDashboardSidebarItems.map(item => 
              <li 
                className="app-dashboard-sidebar-body-item" 
                key={item.id}
              >
                <Link 
                  className={`app-dashboard-sidebar-body-item-btn btn btn-block w-100 ${DashboardHelper.isItemActive(item.id, props.currentId)}`}
                  role="button"
                  to={item.route}
                  onClick={() => props.onClick(item.id)}
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

export default AppDashboardLayout