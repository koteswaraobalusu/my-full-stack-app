import React, { useEffect } from 'react'
import LoginPage from './pages/login/LoginPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignupPage from './pages/signup/SignupPage'
import { useRefreshMutation } from './api/authApi'


const App = () => {
  const [refresh] = useRefreshMutation(); // ✅ use this trigger function

  useEffect(() => {
    const updateRefresh = async () => {
      try {
        const res=await refresh(); // ✅ triggers the refresh mutation
        console.log(res)
      } catch (err) {
        console.error("Refresh failed:", err);
      }
    };

    setTimeout(
      ()=>{
        updateRefresh();
      },60*1000
    )
  }, []);

  return (
    <Router>
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
      
    </Router>
  )
}

export default App
