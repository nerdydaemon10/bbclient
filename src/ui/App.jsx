import { Navigate, Route, Routes } from "react-router-dom"
import { isNil } from "lodash"
import { Fragment } from "react"

import LoginPage from "./login/LoginPage.jsx"
import { Role } from "../util/classes"
import { local } from "../util"
import AdminPage from "./admin/AdminPage.jsx"
import EmployeePage from "./employee/EmployeePage.jsx"
import store from "./redux/store.js"
import { employees } from "../data/services/employees.js"

function App() {
	store.dispatch(employees.endpoints.fetchEmployees.initiate())

	return (
		<Routes>
			<Route path="/" element={
				<AuthRoute isLogin>
					<LoginPage />
				</AuthRoute>
			} />
			<Route path="/admin/*" element={
				<ProtectedRoute roles={[Role.ADMIN]}>
					<AdminPage />
				</ProtectedRoute>
			} />
			<Route path="/employee/*" element={
				<ProtectedRoute roles={[Role.EMPLOYEE]}>
					<EmployeePage />
				</ProtectedRoute>
			} />
		</Routes>
  )
}
function AuthRoute({children}) {
	const user = local.get("user")
	
	if (!isNil(user))
		return <Navigate to={`/${user.role}`} replace />
	
	return (
		<Fragment>
			{children}
		</Fragment>
	)
}
function ProtectedRoute({roles, children}) {
  const user = local.get("user")

	if (isNil(user)) 
		return <Navigate to="/" replace />
		
	const unauthorized = !roles.includes(user.role)

	if (unauthorized) 
		return <Navigate to={`/${user.role}`} replace />

	return (
		<Fragment>
			{children}
		</Fragment>
	)
}

export default App