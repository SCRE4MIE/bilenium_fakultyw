import React from 'react';
import useTrainerWalkHistory from '../../../CustomHooks/useTrainerWalkHistory';
import './TrainerWalksHistory.css';
import TrainerPastWalk from '../../../Components/TrainerPastWalk/TrainerPastWalk';

const TrainerWalksHistory = () => {

  const userId = JSON.parse(sessionStorage.getItem('userDetails')).pk;

  const pastWalks = useTrainerWalkHistory(userId).map(e => {
    return <TrainerPastWalk key={e.id} id={e.id} startDate={e.date} endDate={e.date_end} dogs={e.dogs}/>
  });

  return (
    <div className='trainerIncomingWalks'>
      {pastWalks.length > 0 && <h1>Walk history</h1>}
      {pastWalks.length > 0 ? pastWalks : <h1>You have no previous walks</h1>}
    </div>
  )
}

export default TrainerWalksHistory;