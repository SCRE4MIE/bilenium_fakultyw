import React from 'react'
import './DogListElement.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from '@mui/material/';
import { useNavigate } from 'react-router-dom';

const DogListElement = ({ imageSrc, name, id }) => {
  
  const navigate = useNavigate();

  const openDogProfile = () => {
    sessionStorage.setItem('currentDog', id);
    navigate('/dogProfile');
  };

  return (
    <div className='dogListElement' onClick={openDogProfile}>
      <div className='dogPictureContainer'>
        <img src={imageSrc} alt='' />
      </div>
      <p className='dogName'>{name}</p>
      <Tooltip title='Edit your dog'>
        <EditOutlinedIcon className='icon' style={{cursor: 'pointer'}}/>
      </Tooltip>
    </div>
  )
}

export default DogListElement