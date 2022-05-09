import { ClassNames } from '@emotion/react'
import React from 'react'
import "./DogProfile.css"
import cashtan from '../../../Images/Cashtan.png';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import ApiPicture from '../../../Components/ApiPicture';
import instance from '../../../axios';
import requests from '../../../requests';
import { useEffect, useState } from 'react';

const id = sessionStorage.getItem('currentDog')
const details = JSON.parse(sessionStorage.getItem('dogDetails'));//daje pierwszy avatar po załadowaniu strony jaki był wyświetlony

const DogProfile = ({dogId}) => {

  const [dogData, setDogData] = useState({});

  useEffect(() => {
    instance.get(`${requests.dogDetails}${dogId}/`)
    .then(response => {
      setDogData(response.data);
    }).catch(error => {
      console.log(error);
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
        <div className='DogProfile--imageContainer'><img className='DogProfile--image' src= {dogData.avatar}  alt='dog profile picture'/></div>
        <EditOutlinedIcon className='editIcon'  style={{marginBottom: '8px', cursor: 'pointer', fontSize: '40px', transition: '100ms'}} onClick={openDogEdit}/>
      </div>
      <h2>Breed: {dogData.breed}</h2>
      <h2>Age: {dogData.age}</h2>
      <p>Description:</p>
      <p>{dogData.description}</p>
      
    </div>


  )
}

export default DogProfile