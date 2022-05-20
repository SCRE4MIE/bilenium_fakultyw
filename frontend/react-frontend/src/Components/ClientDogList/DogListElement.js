import React from 'react'
import './DogListElement.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';

const DogListElement = ({ imageSrc, name, id }) => {
  
  const navigate = useNavigate();

  const openDogProfile = () => { 
    sessionStorage.setItem('currentDog', id);
    navigate('/dogProfile');
  };

  const openDogEdit = () => {
    sessionStorage.setItem('currentDog', id);
    navigate('/editDog');
  };

  return (
    <div className='dogListElement' >
      <div className='dogDataContainer' onClick={openDogProfile}>
        <div className='dogPictureContainer'>
          {
            imageSrc ? 
            <img src={imageSrc} alt=''/> 
            : <PetsIcon style={{alignSelf: 'center', fontSize: '35px', color: 'lightgray', width: '100%'}}/>
          }
        </div>
        <p className='dogName'>{name}</p>
      </div>
      <Tooltip title='Edit your dog'>
        <EditOutlinedIcon className='icon' style={{cursor: 'pointer'}} onClick={openDogEdit}/>
      </Tooltip>
    </div>
  )
}

export default DogListElement