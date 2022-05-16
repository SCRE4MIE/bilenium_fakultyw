import React from 'react';
import './TrainerActiveWalks.css';
import requests from '../../../requests';
import instance from '../../../axios';
import { useEffect, useState } from 'react';
import * as dayjs from 'dayjs'

const TrainerActiveWalks = ({trainerId}) => {

  const [walkData, setWalkData] = useState({});
  const hourNow =  dayjs(dayjs()).get('hour');
  const dayNow = dayjs(dayjs()).get('day');

  useEffect(() => {
    instance.get(`${requests.walkDetails}${trainerId}/`)
    .then(response => {
      sessionStorage.setItem('walkData', JSON.stringify(response.data));
      for(var i = 0; i < response.data.length; i++)
      {
        const day = dayjs(response.data[i].date).get('day');
        const hourStart = dayjs(response.data[i].date).get('hour');
        if(day == dayNow)
        {
          if(hourStart <= hourNow && hourStart >= hourNow)
          {
            sessionStorage.setItem('activeWalkDogs', JSON.stringify(response.data[i].dogs));
            sessionStorage.setItem('activeWalkDate', dayjs(response.data[i].date).format('YYYY/MM/DD'));
            sessionStorage.setItem('activeWalkStart', dayjs(response.data[i].date).format('HH:mm'));
            sessionStorage.setItem('activeWalkEnd', dayjs(response.data[i].date).add(1, 'hour').format('HH:mm'));

          }
        }
      }  
    });
  }, []);

  const [dogData, setDogData] = useState({});

  useEffect(() => {
    instance.get(`${requests.dogDetails}${dogId}/`)
    .then(response => {
      setDogData(response.data);
    });
  }, []);

  const dogs = sessionStorage.getItem('activeWalkDogs');
  const date = sessionStorage.getItem('activeWalkDate');
  const start = sessionStorage.getItem('activeWalkStart');
  const end = sessionStorage.getItem('activeWalkEnd');

  return (
    <div className='trainerActiveWalks'>
      <h1>Active walk</h1>
      Dogs: {dogs}<br/>
      Date: {date}<br/>
      Start: {start} <br/>
      End: {end}


    </div>
  )
}

export default TrainerActiveWalks;