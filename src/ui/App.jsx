import { Navigate, Route, Routes } from "react-router-dom"

import LoginPage from "./login/LoginPage.jsx"
import { Role } from "../util/classes"
import local from "../util/local.js"
import { isEmpty } from "lodash"
import AdminPage from "./admin/AdminPage.jsx"
import EmployeePage from "./employee/EmployeePage.jsx"

function App() {
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
	const role = user && Role.toEnum(user.role_id)

	if (isEmpty(user)) 
		return <>{children}</>

	return <Navigate to={`/${role}`} replace />
}
function ProtectedRoute({roles, children}) {
  const user = local.get("user")
	const roleId = user.role_id
	const role = user && Role.toEnum(roleId)

	if (isEmpty(user)) {
		return <Navigate to="/" replace />
	}

	const isRestricted = !roles.includes(roleId)

	if (isRestricted) {
		return <Navigate to={`/${role}`} replace />
	}
	
	return <>{children}</>
}

export default App