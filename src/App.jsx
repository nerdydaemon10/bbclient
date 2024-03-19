import { Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './pages/home/HomePage.jsx'
import LoginPage from './pages/login/LoginPage.jsx'
import AppLocalStorage from './utils/AppLocalStorage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/home/*" element={<ProtectedPage />} />
    </Routes>
  )
}

function ProtectedPage() {
  const accessToken = AppLocalStorage.readAccessToken()
  return (accessToken ? <HomePage /> : <Navigate to="/" replace={true} />)
}

export default App