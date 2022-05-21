import React from 'react';
import useIncomingWalks from '../../../CustomHooks/useIncomingWalks';
import './TrainerIncomingWalks.css';
import TrainerIncomingWalk from '../../../Components/TrainerIncomingWalk/TrainerIncomingWalk';

const TrainerIncomingWalks = () => {

  const userId = JSON.parse(sessionStorage.getItem('userDetails')).pk;

  const incomingWalks = useIncomingWalks(userId).map(e => {
    return <TrainerIncomingWalk key={e.id} id={e.id} startDate={e.date} endDate={e.date_end} dogs={e.dogs}/>
  });

  return (
    <div className='trainerIncomingWalks'>
      {incomingWalks.length > 0 && <h1>Incoming Walks</h1>}
      {incomingWalks.length > 0 ? incomingWalks : <h1>You have no incoming walks</h1>}
    </div>
  )
}

export default TrainerIncomingWalks;