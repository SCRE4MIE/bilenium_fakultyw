import "./AddNewDog.css"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import requests from '../../../requests';
import instance from '../../../axios';
import { AddDogSchema } from '../../../Validation/AddDogValidation';
import ImageIcon from '@mui/icons-material/Image';

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

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])


  const onImageChange = (e) => {
    setProfilePicture(e.target.files);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      breed: "",
      age: "",
      description: "",
    },
    validationSchema: AddDogSchema,
    onSubmit: () =>{
      handleSubmit();
    } 
  });

  const handleSubmit = () => {

    let formData = new FormData();
    const imageFile = document.querySelector('#avatar');
    formData.append("name", formik.values.name);
    formData.append("breed", formik.values.breed);
    formData.append("age", formik.values.age);
    formData.append("description", formik.values.description);

    imageFile.files[0] ? formData.append("avatar", imageFile.files[0]) : formData.append("avatar", "");

    instance.post(requests.addDog, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json',
      },
    }).then(response => {
      navigate("/dogAdded");
    });
  }

  return (
    <div className='AddNewDog'>
      <h1 className='AddNewDog--header '>Add new dog</h1>
      <div className='dogPicContainer' >
        {selectedFile &&  <img src={preview}/> }
      </div>
      <form id = "addDog" className='AddNewDog--form' onSubmit={formik.handleSubmit}>
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
            <textarea
              className='AddDog--desc' 
              name='description' 
              placeholder="Description" 
              onBlur={formik.handleBlur} 
              value={formik.values.description} 
              onChange={formik.handleChange}
            />
            <div className='AddNewDog--buttons'>
            <label htmlFor="avatar" className="buttonLabel">
            <ImageIcon />Upload a new picture
            </label>
            <input 
              name='avatar' 
              id="avatar"  
              className="button" 
              type='file' 
              onChange={onImageChange} 
              accept="image/png, image/gif, image/jpeg" 
            />
                <input type="submit" value="Finish" className="button"/>
            </div>
        </form>
    </div>
  )
}

export default AddNewDog