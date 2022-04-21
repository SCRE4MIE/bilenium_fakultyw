import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import LoggedOutNavbar from '../../Components/LoggedOutNavbar/LoggedOutNavbar'
import './Register.css'
import RegisterForm from './RegisterForm.js/RegisterForm'
import RegisterUploadPicture from './RegisterUploadPicture/RegisterUploadPicture'

const Register = () => {

  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    phoneNumber: '',
    profilePicture: '',
  });

  const resetForm = () => {
    setNewUserData({
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      phoneNumber: '',
      profilePicture: '',
    })
  }
  
  return (
    <div className='register'>
      <Routes>
        <Route 
          path="/" 
          element={<RegisterForm resetForm={resetForm}/>} 
        />

        <Route 
        path='/image'
            element={<RegisterUploadPicture resetForm={resetForm}/>}
        />

      </Routes>
      <LoggedOutNavbar />
    </div>
  )
}

export default Register