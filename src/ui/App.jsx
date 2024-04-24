import { Navigate, Outlet, Route, Routes } from "react-router-dom"

import LoginPage from "./login/LoginPage.jsx"
import AdminPage from "./admin/AdminPage.jsx"

import { Role } from "../util/classes"

function App() {
	return (
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/admin/*" element={<ProtectedRoute RolesData={[Role.ADMIN]}><AdminPage /></ProtectedRoute>} />
		</Routes>
  )
}

function ProtectedRoute({RolesData, redirectTo = '/', children}) {
	const user = localStorage.getItem("user")
	const isAuthenticated = !!user

	if (!isAuthenticated || !RolesData.some(role => role.id == user.role_id)) {
		return <Navigate to={redirectTo} replace />
	}

	return (
		<>
			{children}
		</>
	)
}

export default App