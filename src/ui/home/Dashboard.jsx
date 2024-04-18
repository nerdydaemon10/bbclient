import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { SlOptionsVertical } from "react-icons/sl"
import { compareRoute, sidebarItems } from "./Util.jsx"
import { BiDownload, BiLogIn, BiLogInCircle, BiLogOut, BiSolidCoffeeBean, BiSolidDownload, BiSolidHome, BiSpreadsheet } from "react-icons/bi"

function Dashboard({children}) {
  return (
    <div className="dashboard">
      <DashboardSidebar />
      <DashboardNavbar />
      {children}
    </div>
  )
}
function DashboardNavbar() {
  return (
    <div className="dashboard-navbar d-flex align-items-center justify-content-between app-px app-bm">
      <ol className="app-breadcrumb">
        <li className="app-breadcrumb-item">  
          <span className="app-breadcrumb-item-icon">
            <BiSolidHome />
          </span>
        </li>
        <li className="app-breadcrumb-item"><a href="#">Home Dashboard</a></li>
        <li className="app-breadcrumb-item is-active"><a href="#">POS System</a></li>
      </ol>
    </div>
  )
}
function DashboardSidebar() {
  const location = useLocation()
  const [route, setRoute] = useState(location.pathname)

  const handleClick = (route) => {
    setRoute(route)
  }

  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-sidebar-header gap-2">
        <span className="badge bg-dark">
          <BiSolidCoffeeBean size={16} />
        </span>
        <h5 className="mb-0">BARISTA BROTHERS</h5>
      </div>
      <div className="dashboard-sidebar-body">
        <ul className="dashboard-sidebar-body-items">
        {
          sidebarItems.map((item, index) => (
            <li className="dashboard-sidebar-body-item" key={index}>
              <Link
                className={`dashboard-sidebar-body-item-btn btn btn-block ${compareRoute(item.route, route) ? 'btn-dark' : 'btn-secondary'}`}
                to={item.route} 
                role="button"
                onClick={() => handleClick(item.route)}
              >
                <span className="dashboard-sidebar-body-item-icon">
                  {compareRoute(item.route, route) ? item.icon.active : item.icon.inactive}
                </span>
                {item.label}
                {item.hasCounter && (<p className="dashboard-sidebar-body-item-count">99+</p>)}
              </Link>
            </li>
          ))
        }
        </ul>
      </div>
      <div className="dashboard-sidebar-footer">
        <div>
          <p className="dashboard-sidebar-footer-name">Keanno Manuel R. Regino</p>
          <p className="dashboard-sidebar-footer-role">
            Employee
          </p>
        </div>
        <Link 
          to="/home/sign-out"
          className="dashboard-sidebar-footer-sign-out-btn"
        >
          <BiLogIn />
        </Link>
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