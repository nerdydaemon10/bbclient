import { Navigate, Route, Routes } from "react-router-dom"

import LoginPage from "./login/LoginPage.jsx"
import AdminPage from "./admin/AdminPage.jsx"
import { Role } from "../util/classes"
import local from "../util/local.js"
import { isEmpty } from "lodash"

function App() {
	return (
		<Routes>
			<Route path="/" element={
				<AuthRoute>
					<LoginPage />
				</AuthRoute>} 
			/>
			<Route path="/admin/*" element={
				<AuthRoleRoute roles={[Role.ADMIN]}>
					<AdminPage />
				</AuthRoleRoute>
			} />
		</Routes>
  )
}
function AuthRoute({children}) {
	const user = local.get("user")
	const role = user && Role.toEnum(user.role_id)

	if (isEmpty(user)) {
		return (<>{children}</>)
	}
	
	return (<Navigate to={`/${role}`} replace />)
}

function AuthRoleRoute({roles, children}) {
	const user = local.get("user")
	const role = Role.toEnum(user.role_id)

	if (isEmpty(user)) {
		return <Navigate to="/" replace />
	}

	const isRestricted = !roles.includes(user.role_id)

	if (isRestricted) {
		return <Navigate to={`/${role}`} replace />
	}
	
	return (<>{children}</>)
}

export default App