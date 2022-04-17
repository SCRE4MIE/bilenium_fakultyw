import React, { useEffect, useState } from 'react'
import './RegisterUploadPicture.css'
import ImageIcon from '@mui/icons-material/Image';
import { Link } from 'react-router-dom';


const RegisterUploadPicture = (props) => {

  const [profilePicture, setProfilePicture] = useState([])
  const [imageURL, setImageURL] = useState([])

  useEffect(() => {
    if (profilePicture.length < 1) return;
    const newImageURL = [];
    Array.from(profilePicture).forEach(picture => newImageURL.push(URL.createObjectURL(picture)));
    setImageURL(newImageURL);
  }, [profilePicture])

  const onImageChange = (e) => {
    setProfilePicture(e.target.files);
  }

  const resetForm = () => {
    props.resetForm();
  }

  return (
    <div className='registerUploadPicture'>
      <h1>Upload a picture</h1>
      <form>
        <div className='profilePictureContainer'>
          <img src={imageURL[0]} alt='' />
        </div>

        <div className='buttonsContainer'>
          <label htmlFor="image-upload" className="button">
              <ImageIcon />Upload a picture
          </label>
          <input id="image-upload" onChange={onImageChange} className='button' type='file' accept="image/png, image/gif, image/jpeg" />
          <button className='button' >Finish</button>
          <Link to={'/'} onClick={resetForm} className='button' >Cancel</Link>
        </div>
      </form>

    </div>
  )
}

export default RegisterUploadPicture