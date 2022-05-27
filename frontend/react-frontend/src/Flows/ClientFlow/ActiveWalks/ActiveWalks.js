import React from 'react';
import ClientActiveWalk from '../../../Components/ClientActiveWalk/ClientActiveWalk';
import useClientActiveWalks from '../../../CustomHooks/useClientActiveWalks';
import './ActiveWalks.css';

const ActiveWalks = () => {

  const activeWalks = useClientActiveWalks().map(e => {
    return <ClientActiveWalk key={e.id} id={e.id} startDate={e.date} endDate={e.date_end} dogs={e.dogs} trainerId={e.trainer}/>
  });
  
  return (
    <div className='trainerIncomingWalks'>
      {activeWalks.length > 0 && <h1>Active Walks</h1>}
      {activeWalks.length > 0 ? activeWalks : <h1>You have no active walks</h1>}
    </div>
  )
}

export default ActiveWalks;