import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddNewDog from './AddNewDog/AddNewDog';
import './ClientFlow.css';
import ClientProfile from './ClientProfile/ClientProfile';
import ClientTrainerList from './ClientTrainerList/ClientTrainerList';
import DogProfile from './DogProfile/DogProfile';
import EditDog from './EditDog/EditDog';




const ClientFlow = () => {

  return (
      <div className='clientFlow'>
        <Routes >        
          <Route path="*" element={<ClientProfile />} />
          <Route path='/' element={<ClientProfile />} />
          <Route exact path='/dogProfile' element={<DogProfile dogId={sessionStorage.getItem('currentDog')}/>} />
          <Route exact path='/trainerList' element={<ClientTrainerList />} />
          <Route exact path='/AddNewDog' element ={<AddNewDog/>} />
          <Route exact path='/editDog' element={<EditDog dogId={sessionStorage.getItem('currentDog')}/>} />
        </Routes>
      </div>
  )
}

export default ClientFlow