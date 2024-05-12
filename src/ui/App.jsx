import { isEmpty, isNil } from "lodash"
import { Fragment, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import LoginPage from "./login/LoginPage.jsx"
import { Role } from "../util/classes"
import { local } from "../util"
import AdminPage from "./admin/AdminPage.jsx"
import EmployeePage from "./employee/EmployeePage.jsx"
import store from "./redux/store.js"
import auth from "../data/services/auth.js"

function App() {
	//local.clear()
	const user = local.get("user")

	return (
		<Routes>
			<Route path="/" element={
				isNil(user) 
					? <LoginPage />
					: <Navigate to={`/${user.role}`} replace />
			} />
			<Route path="/admin/*" element={
				!isNil(user)
					? <AdminPage />
					: <Navigate to="/" replace />
			} />
		</Routes>
  )
}
function Apps() {
	store.dispatch(auth.endpoints.verify.initiate())

	return (
		<Routes>
			<Route path="/" element={
				<AuthRoute>
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