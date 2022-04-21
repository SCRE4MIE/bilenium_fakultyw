import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './ClientFlow.css';
import ClientProfile from './ClientProfile/ClientProfile';
import DogProfile from './DogProfile/DogProfile';

const ClientFlow = () => {

  return (
      <div className='clientFlow'>
        <Routes >        
          <Route path="*" element={<ClientProfile />} />
          <Route path='/' element={<ClientProfile />} />
          <Route exact path='/dogProfile' element={<DogProfile dogId={sessionStorage.getItem('currentDog')}/>} />
        </Routes>
      </div>
  )
}

export default ClientFlow