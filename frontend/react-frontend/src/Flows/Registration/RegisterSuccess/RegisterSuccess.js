import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterSuccess.css';

const RegisterSuccess = (props) => {

  const resetForm = () => {
    props.resetForm();
  }

  return (
    <div className='registerSuccess'>
      <h2>Your account has been created!</h2>
      <Link to={'/'} className='button' onClick={resetForm}>Proceed to login screen</Link>
    </div>
  )
}

export default RegisterSuccess;