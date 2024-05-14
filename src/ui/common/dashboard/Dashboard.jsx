
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { 
	BiLogIn, BiShieldQuarter, 
	BiSolidCoffeeBean
} from "react-icons/bi"

import "./Dashboard.css"
import local from "../../../util/local.js"
import { Role } from "../../../util/classes"
import { Button, Flex, LinkButton } from "../index"
import DashboardNavbar from "./DashboardNavbar.jsx"
import { currentRoute } from "./util.js"
import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import { isNil, truncate } from "lodash"
import { useLogoutMutation } from "../../../data/services/auth.js"
import { toCount } from "../../../util/helper.js"

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
	const user = local.get("user")
	const fullName = truncate(user.full_name, { length: 24 })
	const role = Role.toRole(user.role)
	
	const location = useLocation()
	const [route, setRoute] = useState(currentRoute(location))
	const { data, isLoading, isFetching } = useFetchSummariesQuery()

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
							data={data}
							routeData={routeData}
							isPending={isLoading || isFetching}
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
						<p className="text-body-primary fw-medium mb-0">{fullName}</p>
						<p className="text-body-secondary fs-7 mb-0 lh-1">{role}</p>
					</div>
        </div>
				<SignOutButton />
      </div>
		</div>
	)
}

function SignOutButton() {
	const [logout, { isLoading, isSuccess, isError }] = useLogoutMutation()
	const navigate = useNavigate()

	const handleClick = () => {
		logout()
	}


	useEffect(() => {
		if (isSuccess || isError)	navigate("/")
	}, [isSuccess, isError, navigate])
	
	return (
		<Button 
			variant="outline-dark"
			isLoading={isLoading}
			onClick={handleClick}
		>
			<BiLogIn className="me-1"/>
			Sign Out
		</Button>
	)
}

function SidebarItem({data, routeData, isPending, isSelected, onClick}) {
	const variant = isSelected ? "dark" : "light"
	const icon = isSelected ? routeData.icon.active : routeData.icon.inactive

	return (
		<li>
			<LinkButton 
				to={routeData.route} 
				variant={variant}
				isFullWidth
				onClick={onClick}
			>
				<div className="d-flex flex-row align-items-center justify-content-start fs-7 fw-medium gap-1">
					{icon}
					{routeData.name}
					{routeData.hasCounter && <Badge data={data} routeData={routeData} isPending={isPending} isSelected={isSelected} />}
				</div>
			</LinkButton>
		</li>
	)
}
function Badge({data, routeData, isPending, isSelected}) {
	const { key } = routeData
	const bg = `text-bg-${isSelected ? "light" : "dark"}`
	
	return (
		<span className={`badge ${bg} rounded-pill ms-auto`}>
			{
				isPending ? (
					"Loading"
				) : isNil(data) ? (
					"Empty"
				) : isNil(data[key]) ? (
					"Empty"
				) : toCount(data[key])
			}
		</span>
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