import React from 'react';
import './TrainerActiveWalks.css';
import requests from '../../../requests';
import instance from '../../../axios';
import { useEffect, useState } from 'react';
import * as dayjs from 'dayjs'
import TrainerWalkDogs from '../../../Components/TrainerWalkDogs/TrainerWalkDogs';

const TrainerActiveWalks = ({trainerId}) => {

  const [walkData, setWalkData] = useState({});

  useEffect(() => {
    instance.get(`${requests.walkDetails}${trainerId}/`)
    .then(response => {
      if(response.data.length === 0)
      {
        console.log("No walks");
      }
      for(var i = 0; i < response.data.length; i++)
      {
        const day = dayjs(response.data[i].date).format('YYYY-MM-DD');
        if(day === dayjs(dayjs()).format('YYYY-MM-DD'))
        {
          const hourStart = dayjs(walkData.date).format('HH:mm');
          const hourEnd = dayjs(walkData.date_end).format('HH:mm');
          const hourNow = dayjs().format('HH:mm');
          if(hourStart <= hourNow && hourNow <= hourEnd)
          {
            setWalkData(response.data[i]);
          }
          else
          {
            console.log("Hours don't match")
          }
        }
        else
        {
          console.log("Dates don't match");
        }
      }
    });
  }, []);

  const dateWalk = 'Walk date: ' + dayjs(walkData.date).format('YYYY-MM-DD');
  const hourStart = 'Walk hours: ' + dayjs(walkData.date).format('HH:mm');
  const hourEnd = dayjs(walkData.date_end).format('HH:mm');
  

  const dogComponents = walkData.dogs?.map(id => <TrainerWalkDogs key = {id} id = {id}/>);
  

  return (
    <div className='trainerActiveWalks'>
      <h1 className='activeWalkHeader'>Active walk</h1>
      <p className='walkDate'> {dateWalk}</p>
      <p className='walkHours'> {hourStart} - {hourEnd}</p>

      <h2 className='activeWalkDogs'></h2>
      {dogComponents}

    </div>
  )
}

export default TrainerActiveWalks;