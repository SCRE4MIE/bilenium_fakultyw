import { ClassNames } from '@emotion/react'
import React from 'react'
import "./DogProfile.css"
import cashtan from '../../../Images/Cashtan.png';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

const id = sessionStorage.getItem('currentDog')

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
        <div className='DogProfile--imageContainer'><img className='DogProfile--image' src={cashtan} alt='dog profile picture'/></div>
        <EditOutlinedIcon className='editIcon'  style={{marginBottom: '8px', cursor: 'pointer', fontSize: '40px', transition: '100ms'}} onClick={openDogEdit}/>
      </div>
      <h2>Breed: Mixed</h2>
      <h2>Age: 4 years</h2>
      <p>Description:</p>
      <p>Vivamus eleifend est pharetra metus fringilla, in vehicula est sagittis. Pellentesque sem mauris, 
        porta non dolor eget, condimentum viverra metus. Donec tincidunt tortor turpis, nec malesuada libero cursus fermentum.
      </p>
      
    </div>


  )
}

export default DogProfile