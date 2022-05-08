import { ClassNames } from '@emotion/react'
import React from 'react'
import "./DogProfile.css"
import cashtan from '../../../Images/Cashtan.png';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import ApiPicture from '../../../Components/ApiPicture';

const id = sessionStorage.getItem('currentDog')
const details = JSON.parse(sessionStorage.getItem('dogDetails'));//daje pierwszy avatar po załadowaniu strony jaki był wyświetlony

const DogProfile = (props) => {

  const navigate = useNavigate();

  const openDogEdit = () => {
    navigate('/editDog');
  };

  return (
    <div className='DogProfile'>
      <h1 className='DogProfile--header'> Cashtan profile </h1>
      <div className='DogProfile--icons'>
        <div style={{width:'50px'}}></div>
        <div className='DogProfile--imageContainer'><img className='DogProfile--image' src={details.avatar} alt='dog profile picture'/></div>
        <EditOutlinedIcon className='editIcon'  style={{marginBottom: '8px', cursor: 'pointer', fontSize: '40px', transition: '100ms'}} onClick={openDogEdit}/>
      </div>
      <h2>{details.name}</h2>
      <h2>Age: {details.age}</h2>
      <p>Description:</p>
      <p>{details.description}</p>
      
    </div>


  )
}

export default DogProfile