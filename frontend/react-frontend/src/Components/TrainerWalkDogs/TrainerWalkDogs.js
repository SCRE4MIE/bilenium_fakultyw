import React from 'react'
import { useNavigate } from 'react-router-dom';
import requests from '../../requests';
import instance from '../../axios';
import { useEffect, useState } from 'react';
import './TrainerWalkDogs.css';
import { PetsOutlined } from '@mui/icons-material';

const TrainerWalkDogs = ({id}) => {
  
  const navigate = useNavigate();

  const openTrainerDogProfile = () => { 
    sessionStorage.setItem('currentDog', id);
    navigate('/trainerDogProfile');
  };


  const [dogData, setDogData] = useState({});

  useEffect(() => {
    instance.get(`${requests.getDog}${id}/`)
    .then(response => setDogData(response.data));
  }, [])

  const url = instance.defaults.baseURL.slice(0, -5);

  return (
    <div className='trainerWalkDogs' >
      <div className='dogWalkDataContainer' onClick={openTrainerDogProfile}>
        <div className='dogWalkPictureContainer'>
          {dogData.avatar_url && <img src={`${url}${dogData.avatar_url}`} alt='' />}
          {!dogData.avatar_url && <PetsOutlined style={{alignSelf: 'center', fontSize: '40px', color: 'lightgray'}}/>}
        </div>
        <p className='dogWalkName'>{dogData.name}</p>
      </div>
    </div>
  )
}

export default TrainerWalkDogs