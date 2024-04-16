import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { SlOptionsVertical } from "react-icons/sl"
import { DashboardSidebarItems, isSelected } from "./Util.jsx"

function Dashboard({children}) {
  const location = useLocation()
  const [selectedRoute, setSelectedRoute] = useState(location.pathname)

  const handleSelectedRouteClick = (id) => {
    setSelectedRoute(id)
  }
  
  return (
    <div className="dashboard">
      <DashboardSidebar 
        selectedRoute={selectedRoute}
        onClick={handleSelectedRouteClick} 
      />
      <DashboardNavbar />
      {children}
    </div>
  )
}

function DashboardNavbar() {
  return (
    <div className="dashboard-navbar">
      <button className="btn btn-secondary">
        <SlOptionsVertical />
      </button>
    </div>
  )
}

function DashboardSidebar({selectedRoute, onClick}) {
  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-sidebar-header"></div>
      <div className="dashboard-sidebar-body">
        <ul className="dashboard-sidebar-body-items">
        {
          DashboardSidebarItems.map(item => (
            <li className="dashboard-sidebar-body-item" key={item.id}>
              <Link
                className={`
                  dashboard-sidebar-body-item-btn btn btn-block w-100 
                  ${isSelected(item.route, selectedRoute)}
                `}
                to={item.route} 
                role="button"
                onClick={() => onClick(item.route)}
              >
                <span className="dashboard-sidebar-body-item-icon">{item.icon}</span>
                {item.label}
                <span className="dashboard-sidebar-body-item-size">99+</span>
              </Link>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  )
}

function DashboardMain({className, children}) {
  return (
    <div className={`dashboard-main ${className}`}>
      {children}
    </div>
  )
}

export { DashboardMain }
export default Dashboard