import { useState } from "react";
import AppDashboardSidebarItems from "../../utils/data/AppDashboardSidebarItems.jsx";
import StringHelper from "../../utils/helpers/StringHelper.jsx";
import { Link } from "react-router-dom";

function AppDashboardSidebar() {
  const [sidebarItem, setSidebarItem] = useState(1)

  const handleSidebarItemClick = (id) => {
    setSidebarItem(id)
  }

  return (
    <div className="app-dashboard-sidebar">
      <div className="app-dashboard-sidebar-header">
      </div>
      <div className="app-dashboard-sidebar-body">
        <ul className="app-dashboard-sidebar-body-items">
          {
            AppDashboardSidebarItems.map(item => 
              <li className="app-dashboard-sidebar-body-item" key={item.id}>
                <Link 
                  className={`app-dashboard-sidebar-body-item-btn btn btn-block w-100 ${StringHelper.isDashboardSidebarItemActive(item.id == sidebarItem)}`}
                  role="button" 
                  to={item.route}
                  onClick={() => handleSidebarItemClick(item.id)}
                >
                  <span className="app-dashboard-sidebar-body-item-icon">
                      {item.icon}
                    </span>
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

export default AppDashboardSidebar