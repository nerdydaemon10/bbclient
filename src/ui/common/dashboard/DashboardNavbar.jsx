import { last } from "lodash"
import { Link, useLocation } from "react-router-dom"
import Button from "../buttons/Button.jsx"
import { BiRefresh } from "react-icons/bi"
import { isSelected } from "./util.js"

function DashboardNavbar({routesData}) {
	const location = useLocation()
	const excludes = ["", "/"]
	const routes = location.pathname.split("/").filter(route => !excludes.includes(route))
	const current = last(routes)

  const handleClick = () => {}

	return (
    <div className="dashboard-navbar d-flex flex-row align-items-center justify-content-between p-2 border-bottom">
      <ol className="breadcrumb m-0 p-0">
				{
					routes.map((route, index) => (
            <BreadcrumbItem 
              key={index} 
              route={route}
              routesData={routesData}
              isSelected={isSelected(route, current)}
            />
					))
				}
      </ol>
			<Button
        variant="light"
				isLoading={false}
				onClick={handleClick}
			>
				<BiRefresh className="me-1" />
        Reload
			</Button>
    </div>
	)
}


function BreadcrumbItem({route, routesData, isSelected}) {
  const active = isSelected ? "active pe-none" : ""
  const className = `breadcrumb-item text-decoration-none ${active}`
  const routeData = routesData.find((routeData) => routeData.key == route)
  
  if (!routeData) return

  const icon = isSelected ? routeData.icon.active : routeData.icon.inactive

  return (
    <li className={className}>
      <Link to={routeData.route} className={className}>
        <span className="me-1">
          {icon}
        </span>
        {routeData.name}
      </Link>
    </li>
  )
}

export default DashboardNavbar