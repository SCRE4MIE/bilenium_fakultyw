import { ClassNames } from '@emotion/react'
import React from 'react'
import "./TrainerDogProfile.css"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import ApiPicture from '../../../Components/ApiPicture';
import instance from '../../../axios';
import requests from '../../../requests';
import { useEffect, useState } from 'react';

const id = sessionStorage.getItem('currentDog')

const TrainerDogProfile = ({dogId}) => {

  const [dogData, setDogData] = useState({});

  useEffect(() => {
    instance.get(`${requests.getDog}${dogId}/`)
    .then(response => {
      setDogData(response.data);
    });
  }, []);


  return (
    <div className='trainerDogProfile'>
      <h1 className='trainerDogProfile--header'> {dogData.name}'s profile </h1>
      <div className='trainerDogProfile--icons'>
        <div style={{width:'50px'}}></div>
        <div className='trainerDogProfile--imageContainer'><img className='trainerDogProfile--image' src= {dogData.avatar}  alt='dog profile picture'/></div>
      </div>
      <h2>Breed: {dogData.breed}</h2>
      <h2>Age: {dogData.age}</h2>
      <p>Description:</p>
      <p>{dogData.description}</p>
      
    </div>


  )
}

export default TrainerDogProfile