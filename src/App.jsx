import { Navigate, Route, Routes } from "react-router-dom"

import AppLocalStorage from "./utils/AppLocalStorage.jsx"
import LoginPage from "./ui/login/LoginPage.jsx"
import HomePage from "./ui/home/HomePage.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/home/*" element={<ProtectedPage />} />
    </Routes>
  )
}

function ProtectedPage() {
  const accessToken = AppLocalStorage.readAccessToken()
  return (accessToken ? <HomePage /> : <Navigate to="/" replace={true} />)
}

export default App