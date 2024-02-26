import { Route, Routes } from 'react-router-dom'

import './App.css'
import HomePage from './pages/Home/HomePage.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/home/*" element={<HomePage />}></Route>
      </Routes>
    </>
  )
}

export default App
