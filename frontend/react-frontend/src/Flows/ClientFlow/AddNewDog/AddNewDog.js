import { ClassNames } from '@emotion/react'
import "./AddNewDog.css"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import requests from '../../../requests';
import instance from '../../../axios';
import { AddDogSchema } from '../../../Validation/AddDogValidation';
import ImageIcon from '@mui/icons-material/Image';
import ApiPicture from '../../../Components/ApiPicture';

const AddNewDog = () => {

  const navigate = useNavigate();

  const avatar = JSON.parse(sessionStorage.getItem('userDetails')).avatar_url;

  const [profilePicture, setProfilePicture] = useState([])
  const [imageURL, setImageURL] = useState([])

  useEffect(() => {
    if (profilePicture.length < 1) return;
    const newImageURL = [];
    Array.from(profilePicture).forEach(picture => newImageURL.push(URL.createObjectURL(picture)));
    setImageURL(newImageURL);
  }, [profilePicture]);

  const onImageChange = (e) => {
    setProfilePicture(e.target.files);
  }

  const handleSubmit = () => {
    console.log("new dog added");

    let formData = new FormData();
    const imageFile = document.querySelector('#avatar_url');
    console.log(formik.values.name);
    formData.append("name", "");
    formData.append("breed", "");
    formData.append("age", "");
    formData.append("description", "");

    imageFile.files[0] ? formData.append("avatar", imageFile.files[0]) : formData.append("avatar", "");

    console.log(imageFile.files[0]);

    instance.patch(requests.editProfile, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json',
      },
    })
      .then(response => {
        instance.get(requests.dogDetails)
        .then(response => {
          sessionStorage.setItem('dogDetails', JSON.stringify(response.data));
          navigate('/');
        }).catch(error => {
          console.log(error.details);
        })
      }).catch(error => {
        console.log(error.response.data);
      });
    // navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      phone_number: "",
    },
    validationSchema: AddDogSchema,
    onSubmit: () => handleSubmit(),
  });

  return (
    <div className='AddNewDog'>
      <h1 className='AddNewDog--header '>Add new dog</h1>
      <form className='AddNewDog--form' onSubmit={formik.handleSubmit}>
            {formik.errors.name && formik.touched.name ? <p className="formError">{formik.errors.name}</p> : null}
            <input 
              name='name' 
              type="text" 
              placeholder="Dog's name" 
              onBlur={formik.handleBlur} 
              value={formik.values.name} 
              onChange={formik.handleChange} 
            />
            {formik.errors.breed && formik.touched.breed ? <p className="formError">{formik.errors.breed}</p> : null}
            <input 
              name='breed' 
              type="text" 
              placeholder="Dog's breed" 
              onBlur={formik.handleBlur} 
              value={formik.values.breed} 
              onChange={formik.handleChange}
            />
            {formik.errors.age && formik.touched.age ? <p className="formError">{formik.errors.age}</p> : null}
            <input 
              name='age' 
              type="number" 
              placeholder="Dog's age" 
              onBlur={formik.handleBlur} 
              value={formik.values.age} 
              onChange={formik.handleChange}
            />
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
            <label htmlFor="avatar" className="button">
            <ImageIcon />Upload a new picture
            </label>
            <input 
              name='avatar' 
              id="avatar" 
              className='button' 
              type='file' 
              onChange={onImageChange} 
              accept="image/png, image/gif, image/jpeg" 
            />
                <input type="submit" value="Finish"/>
            </div>
        </form>
    </div>
  )

}

export default AddNewDog