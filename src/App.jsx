import { useSelector } from 'react-redux'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import HomePage from './pages/Home/HomePage.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import AppLocalStorage from './utils/AppLocalStorage.jsx'

import "./Test.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/home/*" element={<AuthenticateRoute />} />
    </Routes>
  )
}

function AuthenticateRoute() {
  const accessToken = AppLocalStorage.readAccessToken()
  return (accessToken ? <HomePage /> : <Navigate to="/" replace={true} />)
}

export default App