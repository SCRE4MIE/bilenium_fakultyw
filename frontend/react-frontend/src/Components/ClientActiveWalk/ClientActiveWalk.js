import { Box, LinearProgress, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import instance from '../../axios';
import requests from '../../requests';
import ElementIncomingWalkTrainer from '../ElementIncomingWalkTrainer/ElementIncomingWalkTrainer';
import TrainerDogElement from '../TrainerDogElement/TrainerDogElement';
import './ClientActiveWalk.css';

const ClientActiveWalk = ({ id, startDate, endDate, dogs, trainerId}) => {

  const [dogsList, setDogList] = useState([]);
  const dayjs = require('dayjs');
  const [progress, setProgress] = useState(0);

  const now = dayjs();
  const start = dayjs(startDate);

  useEffect(() => {
    instance.get(requests.userDogList)
    .then(response => {
      setDogList(response.data);
    })
  }, [])

  const myDogs = dogsList ? dogsList.filter(e => {
    return dogs.includes(e.pk);
  }) : null

  const dogElements = dogsList? myDogs.map(e => (
    <TrainerDogElement key={e.pk} id = {e.pk} />
  )): null;

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.trunc(now.diff(start, 'minute') / 60 * 100);
      setProgress((oldProgress) => {
        return Number(diff);
      })
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [])
  
  return (
    <div className='clientActiveWalk'>
            <div className='NamesElements'>
        <p>Dogs: </p>
        <div className='names'>
          {dogElements}
        </div>
      </div>
      <div className='line'></div>
      <div className='NamesElements'>
        <p>Trainer: </p>
        <div className='names'>
          <ElementIncomingWalkTrainer key={trainerId} id = {trainerId} />
        </div>
      </div>

      <div className='info'>
        <p>Date of the walk: {dayjs(startDate).format('DD/MM/YYYY')}</p>
        <p>
          Start: {dayjs(startDate).subtract(1, 'minute').format('hh:mm')} - {dayjs(endDate).format('hh:mm')} : End
        </p>
      </div>
      <Tooltip title="Walk progress">
        <Box sx={{ width: '100%', marginTop: '20px'}}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Tooltip>
    </div>
  )
}

export default ClientActiveWalk