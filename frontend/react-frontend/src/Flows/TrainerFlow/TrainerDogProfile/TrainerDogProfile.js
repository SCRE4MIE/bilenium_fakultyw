import React from 'react'
import "./TrainerDogProfile.css"
import instance from '../../../axios';
import requests from '../../../requests';
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const id = sessionStorage.getItem('currentDog')

const TrainerDogProfile = ({dogId}) => {

  const [dogData, setDogData] = useState({});

  const navigate = useNavigate();

  const goToOwnerProfile = (pk) => {
    navigate(`/ownerProfile/${pk}`);
  }

  useEffect(() => {
    instance.get(`${requests.getDog}${dogId}/`)
    .then(response => {
      setDogData(response.data);
    });
  }, []);

  const url = instance.defaults.baseURL.slice(0, -5);

  return (
    <div className='trainerDogProfile'>
      <h1 className='trainerDogProfile--header'> {dogData.name}'s profile </h1>
      <div className='trainerDogProfile--icons'>
        <div className='trainerDogProfile--imageContainer'>
          <img className='trainerDogProfile--image' src= {`${url}${dogData.avatar_url}`}  alt=''/>
          <Tooltip title={`Owner - ${dogData.owner?.username}`} placement="right-start">
            <div className='trainerDogProfile--owner' onClick={() => goToOwnerProfile(dogData.owner.pk)}>
              <img src={`${url}${dogData.owner?.avatar_url}`} alt=''/>
            </div>
          </Tooltip>
        </div>
      </div>
      <h2>Breed: {dogData.breed}</h2>
      <h2>Age: {dogData.age}</h2>
      <p>Description:</p>
      <p>{dogData.description}</p>
      
    </div>


  )
}

export default TrainerDogProfile