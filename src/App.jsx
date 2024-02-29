import { useSelector } from 'react-redux'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import './App.css'
import HomePage from './pages/Home/HomePage.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import { loggedIn } from './redux/auth/authSlice.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route exact path="/home/*" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

function ProtectedRoute() {
  console.log(loggedIn())
  return loggedIn() ? <Outlet /> : <Navigate to="/" />
}

export default App
