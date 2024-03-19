import { Navigate, Route, Routes } from 'react-router-dom'

import AppLocalStorage from './utils/AppLocalStorage.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home/*" element={<ProtectedPage />} />
    </Routes>
  )
}

function ProtectedPage() {
  const accessToken = AppLocalStorage.readAccessToken()
  return (accessToken ? <HomePage /> : <Navigate to="/" replace={true} />)
}

export default App