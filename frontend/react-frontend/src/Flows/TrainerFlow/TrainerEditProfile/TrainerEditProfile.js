import React from 'react';
import './TrainerEditProfile.css';
import { Link, useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import ApiPicture from '../../../Components/ApiPicture';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { editProfileSchema } from '../../../Validation/EditProfileValidation';
import instance from '../../../axios';
import requests from '../../../requests';
import { Alert, Checkbox, FormControlLabel, FormGroup } from '@mui/material';


const TrainerEditProfile = () => {

  const navigate = useNavigate();

  const avatar = JSON.parse(sessionStorage.getItem('userDetails')).avatar_url;
  const id = JSON.parse(sessionStorage.getItem('userDetails')).pk;
  const phone_number = JSON.parse(sessionStorage.getItem('userDetails')).phone_number;

  const [availibility, setAvailibility] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  })

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
        instance.patch(`${requests.updateTrainerworkDays}${availibility.id}`,{
          monday: availibility.monday,
          tuesday: availibility.tuesday,
          wednesday: availibility.wednesday,
          thursday: availibility.thursday,
          friday: availibility.friday,
          saturday: availibility.saturday,
          sunday: availibility.sunday,
        }).then(
            instance.get(requests.userDetails)
            .then(response => {
              sessionStorage.setItem('userType', response.data.is_trainer ? 'trainer' : 'client');
              sessionStorage.setItem('userDetails', JSON.stringify(response.data));
              navigate('/');
            }).catch(error => {
              console.log(error);
            })
        ).catch(error => {console.log(error.response.data)});
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

  const handleAvailibilityChange = (e) => {
    const name = e.target.name;
    const value = e.target.value === 'true';
    setAvailibility(prevAvailibility => ({
      ...prevAvailibility,
      [name]: !value,
    }));
  }

  useEffect(() => {
    instance.get(`${requests.getTrainerWorkDaysByUser}${id}/`)
    .then(response => setAvailibility(response.data[0]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='trainerEditProfile'>
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
          placeholder={phone_number} 
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur}
        />
        <div className='checks'>
          <label htmlFor='checks'><p className='formLabel'>Set your availibility</p></label>
          <FormGroup name='checks' aria-label="position" row>
            <FormControlLabel
              value={availibility.monday}
              name="monday"
              control={<Checkbox onChange={handleAvailibilityChange} color="success" inputProps={{'aria-label': 'Monday'}} checked={availibility.monday ? availibility.monday : false} />}
              label="Mon"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={availibility.tuesday}
              name='tuesday'
              control={<Checkbox onChange={handleAvailibilityChange} color="success" inputProps={{'aria-label': 'Tuesday'}} checked={availibility.tuesday ? availibility.tuesday : false} />}
              label="Tue"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={availibility.wednesday}
              name='wednesday'
              control={<Checkbox onChange={handleAvailibilityChange} color="success" inputProps={{'aria-label': 'Wednesday'}} checked={availibility.wednesday ? availibility.wednesday : false} />}
              label="Wed"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={availibility.thursday}
              name='thursday'
              control={<Checkbox onChange={handleAvailibilityChange} color="success" inputProps={{'aria-label': 'Thursday'}} checked={availibility.thursday ? availibility.thursday : false} />}
              label="Thu"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={availibility.friday}
              name='friday'
              control={<Checkbox onChange={handleAvailibilityChange} color="success" inputProps={{'aria-label': 'Friday'}} checked={availibility.friday ? availibility.friday : false} />}
              label="Fri"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={availibility.saturday}
              name='saturday'
              control={<Checkbox onChange={handleAvailibilityChange} color="success" inputProps={{'aria-label': 'Saturday'}} checked={availibility.saturday ? availibility.saturday : false} />}
              label="Sat"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={availibility.sunday}
              name='sunday'
              control={<Checkbox onChange={handleAvailibilityChange} color="success" inputProps={{'aria-label': 'Sunday'}} checked={availibility.sunday ? availibility.sunday : false} />}
              label="Sun"
              labelPlacement="bottom"
            />
          </FormGroup>
          <Alert severity="info" style={{maxWidth: '264px', borderRadius: '0px 0px 10px 10px', marginTop: '10px'}}>Changing your availibility won't call of your incoming walks!</Alert>
        </div>


        <button className="button" type='submit'>Finish</button>
        <Link to={'/'} className="button">Cancel</Link>
        </form>
    </div>
  )
}

export default TrainerEditProfile