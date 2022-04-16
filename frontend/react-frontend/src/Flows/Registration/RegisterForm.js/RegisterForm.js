import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './RegisterForm.css'

const RegisterForm = (props) => {

  const resetForm = () => {
    props.resetForm();
  }

  return (
    <div className='registerForm'>
      <h1>Create an account</h1>
      <form>
        <input type="text" placeholder="E-mail" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Repeat password" />
        <input type="text" placeholder="Phone number" />

        <div className='buttonsContainer'>
          <Link to={'/register'} className='button' >Upload a picture</Link>
          <Link to={'/register'} className='button' >Finish</Link>
          <Link to={'/'} onClick={resetForm} className='button' >Cancel</Link>
        </div>

      </form>
    </div>
  )
}

export default RegisterForm