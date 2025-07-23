import React, { useEffect, useReducer } from 'react'
import './signuppage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useRegisterMutation } from '../../api/authApi';



const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'username':
      return { ...state, username: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'confirmPassword':
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
};



const SignupPage = () => {
  const[state,dispatch]=useReducer(reducer,initialState);
  const [errors,setErrors]=useState({})
  const [register]=useRegisterMutation() 
  const navigate=useNavigate();

   const validateForm = () => {
    const newErrors = {};
    if (state.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }
    if (!state.email.includes('@')) {
      newErrors.email = 'Enter a valid email.';
    }
    if (state.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    if (state.password !== state.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const res = await register(state).unwrap();
      console.log("Success:", res);
      localStorage.setItem('access_token', res.access); 
      navigate('/')
      
    } catch (err) {
      console.log("API error:", err);
      // If backend sends error messages as { username: ["..."], email: ["..."] }
      if (err?.data) {
        const backendErrors = {};
        for (const key in err.data) {
          backendErrors[key] = err.data[key][0]; // Show the first message
        }
        setErrors(backendErrors);
      } else {
        setErrors({ general: "Registration failed. Try again." });
      }
    }
  }
};

  return (
    <div className='container'>

        <div className='signup'>
            <h1>Instagram</h1>
            <form onSubmit={handleSubmit}>
                <div className="fieldset">
                  <input type='text' placeholder='Username' value={state.username} onChange={(e) => dispatch({ type: 'username', payload: e.target.value })}required/>
                  {errors.username && <p className='errors'>{errors.username}</p>}
                </div>
                <div className="fieldset">
                  <input type='email' placeholder='Email' value={state.email} onChange={(e) => dispatch({ type: 'email', payload: e.target.value })}required/>
                  {errors.email && <p className='errors'>{errors.email}</p>}
                </div>
                <div className="fieldset">
                  <input type='password' placeholder='Password' value={state.password} onChange={(e) => dispatch({ type: 'password', payload: e.target.value })}required/>
                  {errors.password && <p className='errors'>{errors.password}</p>}
                </div>
                <div className="fieldset">
                  <input type='password' placeholder='Confirm Password' value={state.confirmPassword} onChange={(e) => dispatch({ type: 'confirmPassword', payload: e.target.value })}required/>
                  {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
                </div>
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
