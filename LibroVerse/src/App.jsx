import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Index from './pages/Index'
import Login from './auth_pages/Login'
import Create_Account from './auth_pages/Create_Account'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import { CartProvider } from './context/CartContext'


function App() {

  return (
    <CartProvider>
    <Router>
          <Routes>
                <Route path='/' element={  <Login/> } />
                <Route path='/create' element={  <Create_Account/> } />
                <Route path='/home' element={<ProtectedRoute> <Index/> </ProtectedRoute>} />
          </Routes>
    </Router>
    </CartProvider>
  )
}

export default App
