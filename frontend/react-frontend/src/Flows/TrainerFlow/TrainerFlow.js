import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './TrainerFlow.css';
import TrainerProfile from './TrainerProfile/TrainerProfile';
import TrainerIncomingWalks from './TrainerIncomingWalks/TrainerIncomingWalks';
import TrainerActiveWalks from './TrainerActiveWalks/TrainerActiveWalks';
import TrainerWalksHistory from './TrainerWalksHistory/TrainerWalksHistory';
import TrainerEditProfile from './TrainerEditProfile/TrainerEditProfile';

const TrainerFlow = () => {
  return (
    <div className='trainerFlow'>
      <Routes >
          <Route path="*" element={<TrainerProfile />} />
          <Route path='/' element={<TrainerProfile />} />
          <Route exact path='/incomingWalks' element={<TrainerIncomingWalks />} />
          <Route exact path='/activeWalks' element={<TrainerActiveWalks />} />
          <Route exact path='/walksHistory' element={<TrainerWalksHistory />} />
          <Route exact path='/editProfile' element={<TrainerEditProfile />} />
        </Routes>
    </div>
  )
}

export default TrainerFlow;