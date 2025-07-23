import React, { useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { useRefreshMutation } from './api/authApi'
import AppLayout from './AppLayout'






const App = () => {
  const [refresh]=useRefreshMutation()
useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await refresh().unwrap();
      localStorage.setItem('access_token', res.access);
      console.log("refresh")
    } catch (err) {
      console.log('Auto refresh failed');
    }
  },29* 60 * 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <Router>
        <AppLayout/>
      
    </Router>
  )
}

export default App
