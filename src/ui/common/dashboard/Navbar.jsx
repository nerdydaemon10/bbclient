import { isNil, last } from "lodash"
import { Link, useLocation } from "react-router-dom"
import Button from "../buttons/Button.jsx"
import { BiRefresh } from "react-icons/bi"
import { isSelected } from "./util.js"

function Navbar({items}) {
	const location = useLocation()
	const excludes = ["", "/"]
	const routes = location.pathname.split("/").filter(route => !excludes.includes(route))
	const current = last(routes)

  const handleClick = () => {}
  
	return (
    <div className="dashboard-navbar d-flex flex-row align-items-center justify-content-between p-2 border-bottom">
      <ol className="breadcrumb m-0 p-0">
				{
					routes.map((route, index) => {
            const item = items.find((item) => item.key == route)

            if (isNil(item)) return

            return (
              <BreadcrumbItem 
                key={index} 
                item={item} 
                isSelected={isSelected(route, current)}
              />
            )
          })
				}
      </ol>
			<Button 
        isLoading={false}
        variant="light" 
        onClick={handleClick}
      >
				<BiRefresh className="me-1" />
        Reload
			</Button>
    </div>
	)
}

function BreadcrumbItem({item, isSelected}) {
  const active = isSelected ? "active pe-none" : ""
  const className = `breadcrumb-item text-decoration-none ${active}`

  const icon = isSelected ? item.icon.active : item.icon.inactive

  return (
    <li className={className}>
      <Link to={item.route} className={className}>
        <span className="me-1">{icon}</span>
        {item.name}
      </Link>
    </li>
  )
}

export default Navbar