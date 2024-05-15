import { isEmpty, isNil } from "lodash"
import { Fragment } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import LoginPage from "./login/LoginPage.jsx"
import { Role } from "../util/classes"
import { local } from "../util"
import AdminPage from "./admin/AdminPage.jsx"
import EmployeePage from "./employee/EmployeePage.jsx"	

function App() {
	return (
		<Routes>
			<Route path="/" element={<LoginRoute />} />
			<Route path="/admin/*" element={
				<PrivateRoute roles={[Role.ADMIN]}>
					<AdminPage />
				</PrivateRoute>
			} />
			<Route path="/employee/*" element={
				<PrivateRoute roles={[Role.EMPLOYEE]}>
					<EmployeePage />
				</PrivateRoute>
			} />
		</Routes>
  )
}

function LoginRoute() {
	const token = local.get("token")
	const user = local.get("user")

	const isUnauthenticated = isNil(token) || isEmpty(token)

	if (isUnauthenticated)
		return <LoginPage />

	return <Navigate to={`/${user.role}`} />
}
function PrivateRoute({roles, children}) {
	const token = local.get("token")
	const user = local.get("user")
	
	const isUnauthenticated = isNil(token) || isEmpty(token)
	const isUnauthorized = isNil(user) || isEmpty(user) || !roles.includes(user.role)

	if (isUnauthenticated)
		return <Navigate to="/" />

	if (isUnauthorized)
		return <Navigate to={`/${user.role}`} />

	return (<Fragment>{children}</Fragment>)
}

export default App