import React from 'react';
import './TrainerActiveWalks.css';
import requests from '../../../requests';
import instance from '../../../axios';
import { useEffect, useState } from 'react';
import * as dayjs from 'dayjs'
import TrainerWalkDogs from '../../../Components/TrainerWalkDogs/TrainerWalkDogs';

const TrainerActiveWalks = ({trainerId}) => {

  const dayNow = dayjs(dayjs()).get('day');
  const dateNow = dayjs();

  const [walkData, setWalkData] = useState({});

  useEffect(() => {
    instance.get(`${requests.walkDetails}${trainerId}/`)
    .then(response => {
      for(var i = 0; i < response.data.length; i++)
      {
        const day = dayjs(response.data[i].date).get('day');
        const dateStart = dayjs(response.data[i].date);
        const dateEnd = dateStart.add(1, 'hour');
        if(day == dayNow)
        {
          if(dateStart <= dateNow && dateEnd >= dateNow)
          {
            setWalkData(response.data[i]);
          } 
        }
      }
    });
  }, []);

  const dateWalk = dayjs(walkData.date).format('YYYY-MM-DD');
  const hourStart = dayjs(walkData.date).format('HH:mm');
  const hourEnd = dayjs(walkData.date_end).format('HH:mm');

  const dogComponents = walkData.dogs?.map(id => <TrainerWalkDogs key = {id} id = {id}/>);
  

  return (
    <div className='trainerActiveWalks'>
      <h1 className='activeWalkHeader'>Active walk</h1>
      <p className='walkDate'>Walk date: {dateWalk}</p>
      <p className='walkHours'>Walk hours: {hourStart} - {hourEnd}</p>

      <h2 className='activeWalkDogs'>Dogs: </h2>
      {dogComponents}

    </div>
  )
}

export default TrainerActiveWalks;