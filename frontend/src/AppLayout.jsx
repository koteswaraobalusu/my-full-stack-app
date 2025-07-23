import React from 'react'
import { useLocation } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navabar/Navbar'
import LoginPage from './pages/login/LoginPage.jsx'
import SignupPage from './pages/signup/SignupPage.jsx'
import HomePage from './pages/home/HomePage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'




const AppLayout = () => {
    const location=useLocation();
    const hideNavbar=location.pathname==='/login' || location.pathname==='/signup';

  return (
    <>
        {!hideNavbar && <Navbar/>}
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
            <Route path='/navbar' element={<Navbar/>}/>
        </Routes>
    </>
  )
}

export default AppLayout
