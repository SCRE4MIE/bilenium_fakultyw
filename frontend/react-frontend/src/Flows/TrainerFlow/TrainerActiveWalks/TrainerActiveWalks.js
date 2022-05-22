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
            console.log(walkData);
          }
        }
      }
    });
  }, []);

  const dateWalk = 'Walk date: ' + dayjs(walkData.date).format('YYYY-MM-DD');
  const hourStart = 'Walk hours: ' + dayjs(walkData.date).format('HH:mm');
  const hourEnd = dayjs(walkData.date_end).format('HH:mm');
  const isData = walkData.length;
  console.log(isData);
  

  //const dogComponents = walkData.dogs?.map(id => <TrainerWalkDogs key = {id} id = {id}/>);
  const dogComponents = walkData.dogs?.map(id => {
    return <TrainerWalkDogs key = {id} id = {id}/>
  });

  return (
    <div className='trainerActiveWalks'>
      {dogComponents.length > 0 && <h1>Active walk</h1>}
      {dogComponents.length > 0 ? dogComponents : <h1>You have no active walks</h1>}

    </div>
  )
}

export default TrainerActiveWalks;