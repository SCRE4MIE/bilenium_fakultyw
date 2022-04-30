import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './RegisterForm.css';
import { registerSchema } from '../../../Validation/RegistrationValidation';
import requests from '../../../requests';
import instance from '../../../axios';
import { Snackbar } from '@mui/material';

const RegisterForm = (props) => {

  const navigate = useNavigate();

  const resetForm = () => {
    props.resetForm();
  }

  const [registerError, setRegisterError] = useState({
    email: '',
    username: '',
  });

  console.log(registerError);

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: 'center',
    horizontal: 'center',
  });


  const handleSnackbarOpen = (newState) => () => {
    setSnackbar({ open: true, ...newState });
  };

  const handleSnackbarClose = (newState) => () => {
    setSnackbar({ open: false, ...newState });
  };

  const handleRegister = () => {
    instance.post(requests.registration, {
      email: formik.values.email,
      username: formik.values.username,
      password: formik.values.password,
      phone_number: formik.values.phoneNumber,
    }).then(response => {
      navigate('registerSuccess');
    }).catch(error => {
      console.log(error.response.data);
      setRegisterError({
        email: error.response.data.email ? error.response.data.email[0] : '',
        username: error.response.data.username ? error.response.data.username[0] : '',
      })
    })
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      phoneNumber: "",
    },
    validationSchema: registerSchema,
    onSubmit: () => handleRegister(),
  });

  return (
    <div className='registerForm'>
      <h1>Create an account</h1>
      <form onSubmit={formik.handleSubmit}>
        {registerError.email && <p className='formError'>{registerError.email}</p>}
        {formik.errors.email && formik.touched.email ? <p className="formError">{formik.errors.email}</p> : null}
        <input 
          name='email' 
          type="text" 
          placeholder="E-mail" 
          onBlur={formik.handleBlur} 
          value={formik.values.email} 
          onChange={formik.handleChange} 
        />
        {registerError.username && <p className='formError'>{registerError.username}</p>}
        {formik.errors.username && formik.touched.username ? <p className="formError">{formik.errors.username}</p> : null}
        <input 
          name='username' 
          type="text" 
          placeholder="Username" 
          onBlur={formik.handleBlur} 
          value={formik.values.username} 
          onChange={formik.handleChange} 
        />

        {formik.errors.password && formik.touched.password ?  <p className="formError">{formik.errors.password}</p> : null}
        <input 
          name='password' 
          type="password" 
          placeholder="Password" 
          onBlur={formik.handleBlur} 
          value={formik.values.password} 
          onChange={formik.handleChange} 
        />

        {formik.errors.repeatPassword && formik.touched.repeatPassword ? <p className="formError">{formik.errors.repeatPassword}</p> : null}
        <input 
         name='repeatPassword' 
         type="password" 
         placeholder="Repeat password" 
         onBlur={formik.handleBlur} 
         value={formik.values.repeatPassword} 
         onChange={formik.handleChange} 
        />

        {formik.errors.phoneNumber && formik.touched.phoneNumber ? <p className="formError">{formik.errors.phoneNumber}</p> : null}
        <input 
         name='phoneNumber' 
         type="text" 
         placeholder="Phone number" 
         onBlur={formik.handleBlur} 
         value={formik.values.phoneNumber} 
         onChange={formik.handleChange} 
        />

        <div className='buttonsContainer'>

          
          <button type="submit" className='button' >Create your account</button>
          <Link to={'/'} onClick={resetForm} className='button' >Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm