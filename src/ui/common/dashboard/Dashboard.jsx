import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { 
	BiDownload,
	BiLogIn, BiShieldQuarter, 
	BiSolidCoffeeBean, BiSolidHome, 
	BiSpreadsheet,
	BiUpload
} from "react-icons/bi"

import "./Dashboard.css"
import { useDispatch, useSelector } from "react-redux"
import local from "../../../util/local.js"
import Role from "../../../util/classes/Role.js"
import SecondaryButton from "../buttons/SecondaryButton.jsx"
import { exportToExcel } from "../../redux/salesSlice.js"

function Dashboard({sidebarItems, breadcrumbItems, children}) {
	return (
		<div className="dashboard d-grid vh-100">
			<DashboardSidebar items={sidebarItems} />
			<DashboardNavbar breadcrumbItems={breadcrumbItems} />
			<DashboardMain>
				{children}
			</DashboardMain>
		</div>
	)
}

function DashboardSidebar({items}) {
	const location = useLocation()
  const [route, setRoute] = useState(location.pathname)
	const user = local.get("user")

  const handleClick = (route) => {
    setRoute(route)
  }

	useEffect(() => {
    setRoute(location.pathname)
	}, [location.pathname])

	return (
		<div className="dashboard-sidebar d-grid app-br">
			<div className="dashboard-sidebar-header d-flex align-items-center justify-content-center gap-2 app-bm">
				<span className="badge bg-dark">
					<BiSolidCoffeeBean size={16} />
				</span>
				<h5 className="mb-0">BARISTA BRO.</h5>
			</div>
			<div className="dashboard-sidebar-body p-2">
				<ul className="app-ls-none d-flex flex-column gap-2 m-0 p-0">
				{
					items.map((item, index) => (
						<SidebarItem 
							key={index}
							item={item} 
							index={index}
							isSelected={compareRoute(item.route, route)}
							onClick={() => handleClick(item.route)}
						/>
					))
				}
				</ul>
			</div>
			<div className="dashboard-sidebar-footer d-flex flex-column gap-2 p-2">
        <div className="d-flex align-items-center gap-2">
					<div className="dashboard-sidebar-role-icon">
						<BiShieldQuarter />
					</div>
					<div>
						<p className="app-txt-primary app-txt-fs-14 app-txt-fw-500 app-txt-lh-1 mb-1">{user.full_name}</p>
						<p className="app-txt-secondary app-txt-fs-14 app-txt-fw-500 app-txt-lh-1 mb-0">{Role.toRole(user.role_id)}</p>
					</div>
        </div>
				<Link 
					to="sign-out"
					className="btn btn-sm btn-block btn-outline-dark"
				>
					<BiLogIn className="me-1"/>
					Sign Out
				</Link>
      </div>
		</div>
	)
}

function SidebarItem({item, isSelected, onClick}) {
	const variant = isSelected ? 'btn-dark' : 'btn-secondary'
	const icon = isSelected ? item.icon.active : item.icon.inactive

	return (
		<li>
			<Link
				role="button"
				className={`btn btn-block app-relative app-txt-left app-txt-fs-14 app-txt-fw-500 ${variant}`}
				to={item.route} 
				onClick={onClick}
			>
				<span className="dashboard-sidebar-list-item-icon">
					{icon}
				</span>
				{item.label}	
				{item.hasCounter && (<p className="dashboard-sidebar-list-item-count-txt">99+</p>)}
			</Link>
		</li>
	)
}
function DashboardNavbar() {
	const { breadcrumbItems } = useSelector((state) => state.dashboard)
	const { exportToExcelRes } = useSelector((state) => state.sales)
	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(exportToExcel())
	}

	return (
    <div className="dashboard-navbar d-flex align-items-center justify-content-between p-2 app-bm">
      <ol className="app-breadcrumb">
				<Link 
					to=""
					className="app-breadcrumb-item"
				>
          <span className="app-breadcrumb-item-icon">
            <BiSolidHome className="me-1" />
          </span>
					Home Dashboard
				</Link>
				{
					breadcrumbItems.map((item, index) => (
						<Link key={index} to={item.route} className="app-breadcrumb-item">{item.name}</Link>
					))
				}
      </ol>
			<SecondaryButton 
				isLoading={exportToExcelRes.isLoading}
				onClick={handleClick}
			>
				<BiDownload className="me-1" />
				Export to Excel
			</SecondaryButton>
    </div>
	)
}

function DashboardMain({children}) {
	return (
		<div className="dashboard-main p-2">
			{children}
		</div>
	)
}

function compareRoute(route, current) {
  const lastIndex = current.lastIndexOf("/")
  const isLastIndex = (lastIndex === current.length - 1) && (lastIndex !== 0)
  const formattedRoute = isLastIndex ? current.substring(0, lastIndex) : current

  return formattedRoute === route
}

export {
	Dashboard,
	DashboardSidebar,
	DashboardMain
}