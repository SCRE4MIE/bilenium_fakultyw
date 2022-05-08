import React from 'react'
import './DogListElement.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import requests from '../../requests';
import instance from '../../axios';

const DogListElement = ({ imageSrc, name, id }) => {
  
  const navigate = useNavigate();

  const openDogProfile = () => { //wchodzi do profilu psa i dopiero zmienia details na innego
    sessionStorage.setItem('id', id);
    instance.get(`${requests.dogDetails}${sessionStorage.getItem('id')}/`)
        .then(response => {
          sessionStorage.setItem('dogDetails', JSON.stringify(response.data));
          navigate('/dogProfile');
        }).catch(error => {
          console.log(error);
        });
  };

  const openDogEdit = () => {
    sessionStorage.setItem('id', id);
    instance.get(`${requests.dogDetails}${sessionStorage.getItem('id')}/`)
        .then(response => {
          sessionStorage.setItem('dogDetails', JSON.stringify(response.data));
        }).catch(error => {
          console.log(error);
        });
    navigate('/editDog');
  };

  return (
    <div className='dogListElement' >
      <div className='dogDataContainer' onClick={openDogProfile}>
        <div className='dogPictureContainer'>
          <img src={imageSrc} alt='' />
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