import { Route, Routes } from 'react-router-dom'

import './App.css'
import HomePage from './pages/Home/HomePage.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/home/*" element={<HomePage />}></Route>
      </Routes>
    </>
  )
}

export default App
