import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './ClientFlow.css';
import ClientProfile from './ClientProfile/ClientProfile';
import ClientTrainerList from './ClientTrainerList/ClientTrainerList';
import DogProfile from './DogProfile/DogProfile';
import IncomingWalks from './IncomingWalks/IncomingWalks';
import OrderAWalk from './OrderAWalk/OrderAWalk';
import WalksHistory from './WalksHistory/WalksHistory';
import ActiveWalks from './ActiveWalks/ActiveWalks';
import ClientTrainerProfile from './ClientTrainerProfile/ClientTrainerProfile';
import ClientEditProfile from './ClientEditProfile/ClientEditProfile';
import AddNewDog from './AddNewDog/AddNewDog';
import EditDog from './EditDog/EditDog';

const ClientFlow = () => {

  return (
      <div className='clientFlow'>
        <Routes >
          <Route path="*" element={<ClientProfile />} />
          <Route path='/' element={<ClientProfile />} />
          <Route exact path='/dogProfile' element={<DogProfile dogId={sessionStorage.getItem('currentDog')}/>} />
          <Route exact path='/orderAWalk' element={<OrderAWalk />} />
          <Route exact path='/trainerList' element={<ClientTrainerList />} />
          <Route exact path='/walksHistory' element={<WalksHistory />} />
          <Route exact path='/activeWalks' element={<ActiveWalks />} />
          <Route exact path='/futureWalks' element={<IncomingWalks />} />
          <Route exact path='/trainerProfile' element={<ClientTrainerProfile />} />
          <Route exact path='/editProfile' element={<ClientEditProfile />} />
          <Route exact path='/editDog' element={<EditDog dogId={sessionStorage.getItem('currentDog')}/>} />
          <Route exact path='/addNewDog' element={<AddNewDog dogId={sessionStorage.getItem('currentDog')}/>} />
        </Routes>
      </div>
      // to='/walksHistory'
      // to='/activeWalks'
      // to='/futureWalks'
  )
}

export default ClientFlow;