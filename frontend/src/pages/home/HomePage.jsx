import React from 'react'
import { useHomeQuery, useProfileQuery } from '../../api/authApi'
import Navbar from '../../components/navabar/Navbar';
import './homepage.css'
import Status from '../../components/status/Status';
import Posts from '../../components/posts/Posts';
import UserSuggestions from '../../components/user_suggestions/UserSuggestions';



const HomePage = () => {
  const {data,isLoading}=useHomeQuery();
  const dataProfile=useProfileQuery();
  console.log(dataProfile)
  if(isLoading){
    return <div>Loading.....</div>
  }
  return (
    <div className='homepage'>
      <Navbar/>
      <div className='post-status'>

        <Status/>
        <Posts/>

      </div>

      <div className='suggest'>
        <UserSuggestions/>
      </div>
      
    </div>
  )
}

export default HomePage
