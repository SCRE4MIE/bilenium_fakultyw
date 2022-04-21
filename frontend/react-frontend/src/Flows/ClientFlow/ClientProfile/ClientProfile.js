import React from 'react';
import AddDogButton from '../../../Components/AddDogButton/AddDogButton';
import DogListElement from '../../../Components/ClientDogList/DogListElement';
import './ClientProfile.css';
import dogPicture from '../../../Images/dogPlaceholder.jpg';
import cashtan from '../../../Images/Cashtan.png';
import woman from '../../../Images/womanPlaceholder.jpg'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from '@mui/material/';

const ClientProfile = () => {

  const details = JSON.parse(sessionStorage.getItem('userDetails'));

  const phone_number = [
    details.phone_number.slice(0, 3), " ",
    details.phone_number.slice(3, 6), " ",
    details.phone_number.slice(6, 9)]
    .join('');

  return (
    <div className='clientProfile'>
      <h1>Your profile</h1>
      <div className='userInfo'>
        <div className='avatarSection'>
          <div className='empty'></div>
          <div className='profilePicture'>
            {/* <img src={details.avatar_url} alt='user profile picture'/> */}
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={woman} alt='user profile picture' />
          </div>
          <div className='icons'>
            <Tooltip title='Notifications'>
              <NotificationsNoneOutlinedIcon className='icon'  style={{marginTop: '8px', cursor: 'pointer'}}/>
            </Tooltip>
            <Tooltip title='Edit your profile'>
              <EditOutlinedIcon className='icon'  style={{marginBottom: '8px', cursor: 'pointer'}}/>
            </Tooltip>
          </div>
        </div>
        <h2>{details.username}</h2>
        <h2>
          {phone_number}
        </h2>
      </div>
      <div className='dogList'>
        <h3 className='dogListTitle'>Your dogs</h3>
        <DogListElement id={1} name='Milo' imageSrc={dogPicture}/>
        <DogListElement id={2} name='Cashtan' imageSrc={cashtan}/>
        <AddDogButton />
      </div>
    </div>
  )
}

export default ClientProfile