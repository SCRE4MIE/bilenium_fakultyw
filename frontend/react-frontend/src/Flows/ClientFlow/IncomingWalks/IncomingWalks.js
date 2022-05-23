import React, { useState, useEffect } from 'react';
import './IncomingWalks.css'
import instance from '../../../axios';
import requests from '../../../requests';
import useIncomingWalksUser from '../../../CustomHooks/useIncomingWalksUser';
import ClientIncomingWalk from '../../../Components/ClientIncomingWalk/ClientIncomingWalk';
const IncomingWalks = () => {

  const incomingWalks = useIncomingWalksUser().map(e => {
    return <ClientIncomingWalk key={e.id} id={e.id} startDate={e.date} endDate={e.date_end} dogs={e.dogs} trainerId={e.trainer}/>
  });

  return (
    <div className='trainerIncomingWalks'>
      {incomingWalks.length > 0 && <h1>Incoming Walks</h1>}
      {incomingWalks.length > 0 ? incomingWalks : <h1>You have no incoming walks</h1>}
    </div>
  )
}

export default IncomingWalks;