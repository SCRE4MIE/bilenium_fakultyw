import { ClassNames } from '@emotion/react'
import "./AddNewDog.css"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import requests from '../../../requests';
import instance from '../../../axios';
import { AddDogSchema } from '../../../Validation/AddDogValidation';

const AddNewDog = (props) => {

  const navigate = useNavigate();

  const resetForm = () => {
    props.resetForm();
  }

  const [addDogError, setAddDogError] = useState({
    name: '',
    breed: '',
    age: '',
    description: '',
  });

  console.log(addDogError);

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

  const handleAddDog = () => {
    instance.post(requests.addDog, {
      name: formik.values.name,
      breed: formik.values.breed,
      age: formik.values.age,
      description: formik.values.description,
    }).then(response => {
      navigate('/'); //TU ZAPYTAĆ O ŚCIEŻKE
    }).catch(error => {
      console.log(error.response.data);
      setAddDogError({
        name: error.response.data.name ? error.response.data.name[0] : '',
      })
    })
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      breed: "",
      age: "",
      description: "",
    },
    validationSchema: AddDogSchema,
    onSubmit: () => handleAddDog(),
  });



  return (
    <div className='AddNewDog'>
        <h1 className='AddNewDog--header'>Add new dog</h1>
        <form className='AddNewDog--form' onSubmit={formik.handleSubmit}>
            {addDogError.name && <p className='formError'>{addDogError.name}</p>}
            {formik.errors.name && formik.touched.name ? <p className="formError">{formik.errors.name}</p> : null}
            <input 
              name='name' 
              type="text" 
              placeholder="Dog's name" 
              onBlur={formik.handleBlur} 
              value={formik.values.name} 
              onChange={formik.handleChange} 
            />
            {addDogError.breed && <p className='formError'>{addDogError.breed}</p>}
            {formik.errors.breed && formik.touched.breed ? <p className="formError">{formik.errors.breed}</p> : null}
            <input 
              name='breed' 
              type="text" 
              placeholder="Dog's breed" 
              onBlur={formik.handleBlur} 
              value={formik.values.breed} 
              onChange={formik.handleChange}
            />
            {addDogError.age && <p className='formError'>{addDogError.age}</p>}
            {formik.errors.age && formik.touched.age ? <p className="formError">{formik.errors.age}</p> : null}
            <input 
              name='age' 
              type="number" 
              placeholder="Dog's age" 
              onBlur={formik.handleBlur} 
              value={formik.values.age} 
              onChange={formik.handleChange}
            />
            {addDogError.description && <p className='formError'>{addDogError.description}</p>}
            {formik.errors.description && formik.touched.description ? <p className="formError">{formik.errors.description}</p> : null}
            <input
              className='AddDog--desc' 
              name='description' 
              type="textarea" 
              placeholder="Description" 
              onBlur={formik.handleBlur} 
              value={formik.values.description} 
              onChange={formik.handleChange}
            />
            <div className='AddNewDog--buttons'>
                <input type="button" value="Upload a picture"/>
                <input type="submit" value="Finish"/>
                <Link to={'/'} onClick={resetForm} className='button' >Cancel</Link>
            </div>
        </form>
    </div>


  )
}

export default AddNewDog