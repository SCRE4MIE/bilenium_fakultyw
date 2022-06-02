import React from 'react'
import "./DogProfile.css"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import instance from '../../../axios';
import requests from '../../../requests';
import { useEffect, useState } from 'react';
import { PetsOutlined } from '@mui/icons-material';

const id = sessionStorage.getItem('currentDog')

const DogProfile = ({dogId}) => {

  const [dogData, setDogData] = useState({});

  useEffect(() => {
    instance.get(`${requests.dogDetails}${dogId}/`)
    .then(response => {
      setDogData(response.data);
    });
  }, []);


  const navigate = useNavigate();

  const openDogEdit = () => {
    navigate('/editDog');
  };

  return (
    <div className='DogProfile'>
      <h1 className='DogProfile--header'> {dogData.name}'s profile </h1>
      <div className='DogProfile--icons'>
        <div style={{width:'50px'}}></div>
        <div className={`DogProfile--imageContainer ${!dogData.avatar && 'noAvatar'}`}>
          {dogData.avatar && <img className='DogProfile--image' src= {dogData.avatar}  alt=''/>}
          {!dogData.avatar && <PetsOutlined className='petIcon' style={{color: 'lightgray', fontSize: '100px'}}/>}
        </div>
        <EditOutlinedIcon className='editIcon'  style={{marginBottom: '8px', cursor: 'pointer', fontSize: '40px', transition: '100ms'}} onClick={openDogEdit}/>
      </div>
      <h2>Breed: {dogData.breed}</h2>
      <h2>Age: {dogData.age}</h2>
      <h2>Description:</h2>
      <p className='DogProfile--description'>{dogData.description}</p>
      
    </div>


  )
}

export default DogProfile