import React from 'react';
import './ClientEditProfile.css';
import { Link, useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import ApiPicture from '../../../Components/ApiPicture';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { editProfileSchema } from '../../../Validation/EditProfileValidation';
import instance from '../../../axios';
import requests from '../../../requests';

const ClientEditProfile = () => {

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

    let formData = new FormData();
    const imageFile = document.querySelector('#avatar_url');
    console.log(formik.values.phone_number);
    formData.append("first_name", "");
    formData.append("last_name", "");
    formData.append("phone_number", formik.values.phone_number);

    imageFile.files[0] ? formData.append("avatar", imageFile.files[0]) : formData.append("avatar", "");

    instance.patch(requests.editProfile, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json',
      },
    })
      .then(response => {
        instance.get(requests.userDetails)
        .then(response => {
          sessionStorage.setItem('userType', response.data.is_trainer ? 'trainer' : 'client');
          sessionStorage.setItem('userDetails', JSON.stringify(response.data));
          navigate('/');
        }).catch(error => {
          console.log(error);
        })
      }).catch(error => {
        console.log(error);
      });
    // navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      phone_number: "",
    },
    validationSchema: editProfileSchema,
    onSubmit: () => handleSubmit(),
  });

  return (
    <div className='clientEditProfile'>
      <h1>Edit your profile</h1>
      <form id='editProfile' onSubmit={formik.handleSubmit}>
        <div className='profilePictureContainer'>
          {imageURL[0] ? <img src={imageURL[0]} alt=''/> : <ApiPicture src={avatar}/>}
        </div>

        <label htmlFor="avatar_url" className="button">
            <ImageIcon />Upload a new picture
        </label>
        <input 
          name='avatar_url' 
          id="avatar_url" 
          className='button' 
          type='file' 
          onChange={onImageChange} 
          accept="image/png, image/gif, image/jpeg" 
        />
        <label htmlFor='phone_number'>
          {
            formik.errors.phone_number && formik.touched.phone_number ? 
            <p className='formError'>{formik.errors.phone_number}</p> 
            : <p className='formLabel'>New phone number</p>}
        </label>
        <input 
          name='phone_number' 
          type='text' 
          placeholder='New phone number' 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur}
        />

        <button className="button" type='submit'>Finish</button>
        <Link to={'/'} className="button">Cancel</Link>
        </form>
    </div>
  )
}

export default ClientEditProfile;