import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { 
	BiLogIn, BiShieldQuarter, 
	BiSolidCoffeeBean
} from "react-icons/bi"

import "./Dashboard.css"
import local from "../../../util/local.js"
import { Role } from "../../../util/classes"
import { Flex, LinkButton } from "../index"
import DashboardNavbar from "./DashboardNavbar.jsx"
import { currentRoute } from "./util.js"

function Dashboard({routesData, children}) {
	return (
		<div className="dashboard d-grid vh-100">
			<DashboardSidebar routesData={routesData} />
			<DashboardNavbar routesData={routesData} />
			<DashboardMain>
				{children}
			</DashboardMain>
		</div>
	)
}

function DashboardSidebar({routesData}) {
	const location = useLocation()
	const [route, setRoute] = useState(currentRoute(location))

	const user = local.get("user")
	
	useEffect(() => {
    setRoute(currentRoute(location))
	}, [location])

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
					routesData.filter(routeData => routeData.isSidebarItem).map((routeData, index) => (
						<SidebarItem 
							key={index}
							routeData={routeData} 
							isSelected={isSelected(routeData.key, route)}
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
					replace
				>
					<BiLogIn className="me-1"/>
					Sign Out
				</LinkButton>
      </div>
		</div>
	)
}

function SidebarItem({routeData, isSelected, onClick}) {
	const variant = isSelected ? 'dark' : 'light'
	const icon = isSelected ? routeData.icon.active : routeData.icon.inactive

	return (
		<li>
			<LinkButton
				to={routeData.route}
				variant={variant}
				isFullWidth={true}
				onClick={onClick}
			>
				<div className="d-flex flex-row align-items-center justify-content-start fs-7 fw-medium gap-1">
					{icon}
					{routeData.name}
					{routeData.hasCounter && (<span className={`badge rounded-pill text-bg-${isSelected ? "light" : "dark"} ms-auto`}>99+</span>)}
				</div>
			</LinkButton>
		</li>
	)
}
function DashboardMain({children}) {
	return (
		<div className="dashboard-main p-2 gap-2">
			{children}
		</div>
	)
}

function isSelected(route, current) {
  const lastIndex = current.lastIndexOf("/")
  const isLastIndex = (lastIndex === current.length - 1) && (lastIndex !== 0)
  const formattedRoute = isLastIndex ? current.substring(0, lastIndex) : current

  return formattedRoute === route
}

export { Dashboard, DashboardSidebar, DashboardMain }