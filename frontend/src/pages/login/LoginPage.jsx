import React, { useState } from 'react'
import './loginpage.css'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../../api/authApi'


const LoginPage = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState({})
    const [login,{isError,isLoading}]=useLoginMutation();

    const handleUsername=(e)=>setUsername(e.target.value);
    const handlePassword=(e)=>setPassword(e.target.value);

    const handleSubmit=async (e)=>{
        e.preventDefault()

        // if(username.trim()===''){
        //     setErrors()
        // }

        try{
            const res=await login({username,password}).unwrap();
            console.log(res)

        }
        catch(err){
            setErrors(err)
        }



    }

  return (
    <div className='container'>

        <div className='login'>
            <h1>Instagram</h1>
            {errors.data&& <p className='errors'>{errors.data.error}</p>}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' name='username' value={username} onChange={handleUsername}required/>
                <input type='password' placeholder='Password' name='password' value={password} onChange={handlePassword}required/>
                <input type='submit' value='Log in'/>
            </form>
            <div className='link'>
                <p>Don't have an account?<Link to='/signup'>Sign up</Link></p>
            </div>
        </div>
      
    </div>
  )
}

export default LoginPage
