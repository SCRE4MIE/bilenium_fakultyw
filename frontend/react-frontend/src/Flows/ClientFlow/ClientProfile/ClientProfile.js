import React from 'react';
import AddDogButton from '../../../Components/AddDogButton/AddDogButton';
import DogListElement from '../../../Components/ClientDogList/DogListElement';
import './ClientProfile.css';
import dogPicture from '../../../Images/dogPlaceholder.jpg';
import cashtan from '../../../Images/Cashtan.png';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import ApiPicture from '../../../Components/ApiPicture';

const ClientProfile = () => {

  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate('/editProfile');
    }
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
            <ApiPicture src={details.avatar_url} />
          </div>
          <div className='icons'>
            <Tooltip title='Notifications'>
              <NotificationsNoneOutlinedIcon className='icon'  style={{marginTop: '8px', cursor: 'pointer'}}/>
            </Tooltip>
            <Tooltip title='Edit your profile'>
              <EditOutlinedIcon className='icon'  style={{marginBottom: '8px', cursor: 'pointer'}} onClick={goToEditProfile}/>
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
        <DogListElement id={20} name='Milo' imageSrc={dogPicture}/>
        <DogListElement id={19} name='Cashtan' imageSrc={cashtan}/>
        <AddDogButton />
      </div>
    </div>
  )
}

export default ClientProfile