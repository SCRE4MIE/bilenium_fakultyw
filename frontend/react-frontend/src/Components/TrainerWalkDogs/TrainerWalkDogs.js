import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import requests from '../../requests';
import instance from '../../axios';
import { useEffect, useState } from 'react';
import './TrainerWalkDogs.css';

const TrainerWalkDogs = ({id}) => {
  
  const navigate = useNavigate();

  const openDogProfile = () => { 
    sessionStorage.setItem('currentDog', id);
    navigate('/dogProfile');
  };


  const [dogData, setDogData] = useState({});

  useEffect(() => {
    instance.get(`${requests.getDog}${id}/`)
    .then(response => setDogData(response.data));
  }, [])


  return (
    <div className='trainerWalkDogs' >
      <div className='dogWalkDataContainer' onClick={openDogProfile}>
        <div className='dogWalkPictureContainer'>
          <img src={dogData.avatar} alt='' />
        </div>
        <p className='dogWalkName'>{dogData.name}</p>
      </div>
    </div>
  )
}

export default TrainerWalkDogs