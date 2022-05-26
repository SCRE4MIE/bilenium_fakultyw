import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './TrainerFlow.css';
import TrainerProfile from './TrainerProfile/TrainerProfile';
import TrainerIncomingWalks from './TrainerIncomingWalks/TrainerIncomingWalks';
import TrainerActiveWalks from './TrainerActiveWalks/TrainerActiveWalks';
import TrainerWalksHistory from './TrainerWalksHistory/TrainerWalksHistory';
import TrainerEditProfile from './TrainerEditProfile/TrainerEditProfile';
import TrainerDogProfile from './TrainerDogProfile/TrainerDogProfile';
import TrainerNotifications from './TrainerNotifications/TrainerNotifications';
import TransferAWalk from './TransferAWalk/TransferAWalk';

const TrainerFlow = () => {
  return (
    <div className='trainerFlow'>
      <Routes >
          <Route path="*" element={<TrainerProfile />} />
          <Route path='/' element={<TrainerProfile />} />
          <Route exact path='/incomingWalks' element={<TrainerIncomingWalks />} />
          {/* <Route exact path='/activeWalks' element={<TrainerActiveWalks trainerId={sessionStorage.getItem('currentTrainer')} />} /> */}
          <Route exact path='/walksHistory' element={<TrainerWalksHistory />} />
          <Route exact path='/editProfile' element={<TrainerEditProfile />} />
          <Route exact path='/trainerDogProfile' element={<TrainerDogProfile dogId={sessionStorage.getItem('currentDog')} />} />
          <Route exact path='/notifications' element={<TrainerNotifications />} />
          <Route exact path='/transfer' element={<TransferAWalk />} />
        </Routes>
    </div>
  )
}

export default TrainerFlow;