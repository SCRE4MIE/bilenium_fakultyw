import React from 'react';
import './TrainerActiveWalks.css';
import requests from '../../../requests';
import instance from '../../../axios';
import { useEffect, useState } from 'react';

const TrainerActiveWalks = ({trainerId}) => {

  const [walkData, setWalkData] = useState({});

  console.log(trainerId);

  useEffect(() => {
    instance.get(`${requests.walkDetails}${trainerId}/`)
    .then(response => {
      sessionStorage.setItem('walkData', JSON.stringify(response.data)); //tutaj teraz czas
    }).catch(error => {
      console.log(error.details);
    });
  }, []);

  return (
    <div className='trainerActiveWalks'>
      {walkData.dogs}
    </div>
  )
}

export default TrainerActiveWalks;