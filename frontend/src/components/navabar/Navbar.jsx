import React from 'react'
import home_logo from '../../assets/home_logo.png'
import search_logo from '../../assets/search_logo.png'
import reels_logo from '../../assets/reels_logo.png'
import messages_logo from '../../assets/messages_logo.png'
import notifications_logo from '../../assets/notifications_logo.png'
import profile_logo from '../../assets/profile_logo.png'
import settings_logo from '../../assets/settings_logo.png'
import logout_logo from '../../assets/logout_logo.png';
import './navabar.css'
import { useLoginMutation, useLogoutMutation } from '../../api/authApi'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate=useNavigate()
    const [logout,{isLoading,isError}]=useLogoutMutation()


  const handleLogout=async()=>{

    try{
      const res=await logout().unwrap();
      localStorage.removeItem('access_token')
      navigate('/login')
    }
    catch(err){
      console.log(err)
    }

  }
  const handleHome=()=>{
    navigate('/')
  }



  return (
    <nav className='navbar'>
      <h1>Instagram</h1>
      <ul>
        <li onClick={handleHome}>
          <img src={home_logo}/>
          <span>Home</span>
        </li>
        <li>
          <img src={search_logo}/>
          <span>Search</span>
        </li>
        <li>
          <img src={reels_logo}/>
          <span>Reels</span>
        </li>
        <li>
          <img src={messages_logo}/>
          <span>Messages</span>
        </li>
        <li>
          <img src={notifications_logo}/>
          <span>Notifications</span>
        </li>
        <li>
          <img src={profile_logo}/>
          <span>Profile</span>
        </li>
        <li>
          <img src={settings_logo}/>
          <span>Settings</span>
        </li>
        <li onClick={handleLogout}>
          <img src={logout_logo}/>
          <span>Logout</span>
        </li>
      </ul>
      
    </nav>
  )
}

export default Navbar
