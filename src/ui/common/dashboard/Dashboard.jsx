import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { 
	BiDownload,
	BiLogIn, BiShieldQuarter, 
	BiSolidCoffeeBean, BiSolidHome
} from "react-icons/bi"

import "./Dashboard.css"
import { useDispatch, useSelector } from "react-redux"
import local from "../../../util/local.js"
import { Role } from "../../../util/classes"
import { exportToExcel } from "../../redux/salesSlice.js"
import { Button, Flex, LinkButton } from "../index"

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
		<div className="dashboard-sidebar d-grid border-end">
			<Flex 
				className="dashboard-sidebar-header border-bottom" 
				direction="row"
				justifyContent="center"
				alignItems="center"
				gap="2"
			>
				<span className="badge bg-dark">
					<BiSolidCoffeeBean size={16} />
				</span>
				<span className="mb-0 fs-4 fw-bold">BARISTA BRO.</span>
			</Flex>
			<div className="dashboard-sidebar-body p-2">
				<ul className="list-unstyled d-flex flex-column gap-2 m-0 p-0">
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
			<div className="dashboard-sidebar-footer d-flex flex-column gap-2 p-2 border-top">
        <div className="d-flex align-items-center gap-2">
					<div className="dashboard-sidebar-role-icon">
						<BiShieldQuarter />
					</div>
					<div>
						<p className="text-body-primary fw-medium mb-0">{user.full_name}</p>
						<p className="text-body-secondary fs-7 mb-0 lh-1">{Role.toRole(user.role_id)}</p>
					</div>
        </div>
				<LinkButton
					variant="outline-dark"
					to="sign-out"
				>
					<BiLogIn className="me-1"/>
					Sign Out
				</LinkButton>
      </div>
		</div>
	)
}

function SidebarItem({item, isSelected, onClick}) {
	const variant = isSelected ? 'dark' : 'light'
	const icon = isSelected ? item.icon.active : item.icon.inactive

	return (
		<li>
			<LinkButton
				to={item.route}
				variant={variant}
				isFullWidth={true}
				onClick={onClick}
			>
				<div className="d-flex flex-row align-items-center justify-content-start fs-7 fw-medium gap-1">
					{icon}
					{item.label}
					{item.hasCounter && (<span className={`badge rounded-pill text-bg-${isSelected ? "light" : "dark"} ms-auto`}>99+</span>)}
				</div>
			</LinkButton>
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
    <div className="dashboard-navbar d-flex flex-row align-items-center justify-content-between p-2 border-bottom">
      <ol className="breadcrumb m-0 p-0">
				<Link 
					to=""
					className="breadcrumb-item"
				>
          <span className="app-breadcrumb-item-icon">
            <BiSolidHome className="me-1" />
          </span>
					Home Dashboard
				</Link>
				{
					breadcrumbItems.map((item, index) => (
						<Link key={index} to={item.route} className="breadcrumb-item">{item.name}</Link>
					))
				}
      </ol>
			<Button
				isLoading={exportToExcelRes.isLoading}
				onClick={handleClick}
			>
				<BiDownload className="me-1" />
				Export to Excel
			</Button>
    </div>
	)
}

function DashboardMain({children}) {
	return (
		<div className="dashboard-main p-2 gap-2">
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