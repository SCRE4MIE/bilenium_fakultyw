import React, { useEffect, useState } from 'react';
import AddDogButton from '../../../Components/AddDogButton/AddDogButton';
import DogListElement from '../../../Components/ClientDogList/DogListElement';
import './ClientProfile.css';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import ApiPicture from '../../../Components/ApiPicture';
import useOwnerDogs from '../../../CustomHooks/useOwnerDogs';
import instance from '../../../axios';
import requests from '../../../requests';

const ClientProfile = () => {

  const navigate = useNavigate();

  const userDogs = useOwnerDogs();

  const [notificationCount, setNotificationCount] = useState();

  const goToEditProfile = () => {
    navigate('/editProfile');
    }
  const details = JSON.parse(sessionStorage.getItem('userDetails'));

  const phone_number = [
    details.phone_number.slice(0, 3), " ",
    details.phone_number.slice(3, 6), " ",
    details.phone_number.slice(6, 9)]
    .join('');

  const dogList = userDogs.map(dog => {
    return <DogListElement key={dog.pk} id={dog.pk} name={dog.name} imageSrc={dog.avatar}/>
  })

  useEffect(() => {
    instance.get(requests.getNotificationCount)
    .then(response => setNotificationCount(response.data.count));
  }, []);

  const [tooltip, setTooltip] = useState("")

  useEffect(() => {
    setTooltip(`You have ${notificationCount} unread notification${notificationCount === 1 ? "" : "s"}.`)
  }, [notificationCount]);
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
            <div>
              <Tooltip title={notificationCount ? tooltip : 'There are no new notifications'}>
                <NotificationsNoneOutlinedIcon className='icon'  style={{marginTop: '8px', cursor: 'pointer'}} onClick={() => navigate('/notifications')}/>
              </Tooltip>
              {notificationCount && <div className='notificationCount'>{notificationCount}</div>}
            </div>
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
        {dogList}
        <AddDogButton />
      </div>
    </div>
  )
}

export default ClientProfile;