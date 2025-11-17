import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Index from './pages/Index'
import Login from './auth_pages/Login'
import Create_Account from './auth_pages/Create_Account'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Router>
          <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='/create' element={<Create_Account/>} />
                <Route path='/home' element={<Index/>} />
          </Routes>
    </Router>
  )
}

export default App
