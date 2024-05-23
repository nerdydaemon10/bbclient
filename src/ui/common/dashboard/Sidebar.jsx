import secureLocalStorage from "react-secure-storage"
import { checkSummariesCounts, checkUser, toCount, truncate } from "../../../util/helper.js"
import Role from "../../../util/classes/Role.js"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { currentRoute, isSelected } from "./util.js"
import { BiLogIn, BiShieldQuarter, BiSolidCheckCircle, BiSolidCoffeeBean } from "react-icons/bi"
import LinkButton from "../buttons/LinkButton.jsx"
import { useFetchSummariesQuery } from "../../../data/services/summaries.js"
import { isNil } from "lodash"
import { useLogoutMutation } from "../../../data/services/auth.js"
import Button from "../buttons/Button.jsx"

function Sidebar({items}) {
	const user = checkUser(secureLocalStorage.getItem("user"))
	const fullName = truncate(user.full_name)
	const role = Role.toObject(user.role)
	const isAdmin = Role.isAdmin(role.normalize)

	const location = useLocation()
	const [route, setRoute] = useState(currentRoute(location))
	const { data, isLoading, isFetching } = useFetchSummariesQuery()

	const counts = checkSummariesCounts(data)

	useEffect(() => {
    setRoute(currentRoute(location))
	}, [location])

	return (
		<div className="dashboard-sidebar d-grid border-end">
			<div className="dashboard-sidebar-header border-bottom d-flex flex-row justify-content-center align-items-center gap-2">
				<span className="badge bg-dark">
					<BiSolidCoffeeBean size={16} />
				</span>
				<span className="mb-0 fs-4 fw-bold">BARISTA BRO.</span>
			</div>
			<div className="dashboard-sidebar-body p-2">
				<ul className="list-unstyled d-flex flex-column gap-2 m-0 p-0">
				{
					items.filter(item => item.isSidebarItem).map((item, index) => (
						<SidebarItem 
							key={index}
              isPending={isLoading || isFetching}
							isSelected={isSelected(item.key, route)}
              item={item}
							data={counts}
						/>
					))
				}
				</ul>
			</div>
			<div className="dashboard-sidebar-footer d-flex flex-column gap-2 p-2 border-top">
        <div className="d-flex align-items-center gap-2">
					<div className="dashboard-sidebar-role-icon">
						{role.icon}
					</div>
					<div>
						<p className="text-body-primary fw-medium mb-0">
							{fullName}
							<span className="ms-1">
								{isAdmin && <BiSolidCheckCircle />}
							</span>
						</p>
						<p className="text-body-secondary fs-7 mb-0 lh-1">{role.name}</p>
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
function SidebarItem({isPending, isSelected, item, data, onClick}) {
	const variant = isSelected ? "dark" : "light"
	const icon = isSelected ? item.icon.active : item.icon.inactive

	return (
		<li>
			<LinkButton 
				to={item.route} 
				variant={variant}
				isFullWidth
				onClick={onClick}
			>
				<div className="d-flex flex-row align-items-center justify-content-start fs-7 fw-medium gap-1">
					{icon}
					{item.name}
					{item.hasCounter && (
            <Badge 
              isPending={isPending} 
              isSelected={isSelected}
              item={item}
              data={data} 
            />
          )}
				</div>
			</LinkButton>
		</li>
	)
}
function Badge({isPending, isSelected, item, data}) {
	const bg = `text-bg-${isSelected ? "light" : "dark"}`
  
	return (
		<span className={`badge ${bg} rounded-pill ms-auto`}>
			{
				isPending ? (
					"Loading"
				) : isNil(data) ? (
					"Empty"
				) : isNil(data[item.key]) ? (
					"Empty"
				) : toCount(data[item.key])
			}
		</span>
	)
}

export default Sidebar