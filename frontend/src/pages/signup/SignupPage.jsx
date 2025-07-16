import React from 'react'
import './signuppage.css'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  return (
    <div className='container'>

        <div className='login signup'>
            <h1>Instagram</h1>
            <form>
                <input type='text' placeholder='Username' required/>
                <input type='email' placeholder='Email' required/>
                <input type='password' placeholder='Password' required/>
                <input type='password' placeholder='Password' required/>
                <input type='submit' value='Sign up'/>
            </form>
            <div className='link'>
                <p>Don't have an account?<Link to='/login'>Log in</Link></p>
            </div>
        </div>
      
    </div>
  )
}

export default SignupPage
