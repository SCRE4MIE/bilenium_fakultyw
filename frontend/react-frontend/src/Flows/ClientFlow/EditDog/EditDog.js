import "./EditDog.css"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import requests from '../../../requests';
import instance from '../../../axios';
import { EditDogSchema } from '../../../Validation/EditDogValidation';
import ImageIcon from '@mui/icons-material/Image';
import ApiPicture from '../../../Components/ApiPicture';

const EditDog = () => {

  const navigate = useNavigate();

  const avatar = JSON.parse(sessionStorage.getItem('dogDetails')).avatar;

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

  const formik = useFormik({
    initialValues: {
      name: "",
      breed: "",
      age: "",
      description: "",
    },
    validationSchema: EditDogSchema,
    onSubmit: () =>{
      handleSubmit();
    } 
  });
  
  const handleSubmit = () => {
    console.log("dog eddited");

    let formData = new FormData();
    const imageFile = document.querySelector('#avatar');
    formData.append("name", formik.values.name);
    formData.append("breed", formik.values.breed);
    formData.append("age", formik.values.age);
    formData.append("description", formik.values.description);

    imageFile.files[0] ? formData.append("avatar", imageFile.files[0]) : formData.append("avatar", "");

    instance.patch(`${requests.dogDetails}${sessionStorage.getItem('id')}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json',
      },
    })
    .then(response => {
      instance.get(requests.userDogList)
    }).catch(error => {
        console.log(error);
      })
    }
    //style={{backgroundImage: `url(${oldAvatar})`}}
  return (
    <div className='EditDog'>
      <h1 className='EditDog--header '>Edit dog</h1>
      <div className='dogPicContainer'> 
        {imageURL[0] ? <img src={imageURL[0]} alt=''/> : <ApiPicture src={avatar}/>}
      </div>
      <form id = "EditDog--form" className='EditDog--form' onSubmit={formik.handleSubmit}>
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
              className='EditDog--desc' 
              name='description' 
              type="textarea" 
              placeholder="Description" 
              onBlur={formik.handleBlur} 
              value={formik.values.description} 
              onChange={formik.handleChange}
            />
            <div className='EditDog--buttons'>
            <label htmlFor="avatar" className="buttonLabel">
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

export default EditDog