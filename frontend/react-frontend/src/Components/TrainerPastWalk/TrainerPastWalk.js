import React from 'react';
import TrainerDogElement from '../TrainerDogElement/TrainerDogElement';

const TrainerPastWalk = ({id, startDate, endDate, dogs}) => {

  const dayjs = require('dayjs');

  const dogElements = dogs.map(e => (
    <TrainerDogElement key={e} id = {e} />
  ));

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
      </div>
    </div>
  )
}

export default TrainerPastWalk