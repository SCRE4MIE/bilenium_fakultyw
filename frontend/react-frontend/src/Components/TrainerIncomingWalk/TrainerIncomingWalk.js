import { Alert } from '@mui/material';
import React from 'react';
import TrainerDogElement from '../TrainerDogElement/TrainerDogElement';
import './TrainerIncomingWalk.css';

const TrainerIncomingWalk = ({ id, startDate, endDate, dogs}) => {

  const dayjs = require('dayjs');
  const today = dayjs();

  const dogElements = dogs.map(e => (
    <TrainerDogElement id = {e} />
  ));

  const before24h = dayjs(startDate).diff(today, 'hour') > 24;
  
  return (
    <div className='trainerIncomingWalk'>
      <div className='dogElements'>
        <p>Dogs: </p>
        <div className='dogs'>
          {dogElements}
        </div>
      </div>
      <div className='line'></div>
      <div className='info'>
        <p>Date of the walk: {dayjs(startDate).format('DD/MM/YYYY')}</p>
        <p>
          Start: {dayjs(startDate).subtract(1, 'minute').format('hh:mm')} - {dayjs(endDate).format('hh:mm')} : End
        </p>
        {before24h ? <button className='button'>Transfer to a different trainer</button> : 
        <Alert severity="info" style={{width: '100%', borderRadius: '0px 0px 10px 10px', marginBottom: '-16px', justifyContent: 'center'}}>Transfer unavailible</Alert>}
      </div>
    </div>
  )
}

export default TrainerIncomingWalk;