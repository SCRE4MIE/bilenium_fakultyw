import { Tooltip } from '@mui/material';
import React from 'react';
import './TrainerProfile.css';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import woman from '../../../Images/womanPlaceholder.jpg';
import StarIcon from '@mui/icons-material/Star';
import OpinionAboutTrainerElement from '../../../Components/OpinionAboutTrainer/OpinionAboutTrainerElement';
import ApiPicture from '../../../Components/ApiPicture';
import { useEffect } from 'react';
import instance from '../../../axios';
import requests from '../../../requests';
import { useNavigate } from 'react-router-dom';

const TrainerProfile = () => {

  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate('/editProfile');
  }

  useEffect(() => {
    instance.get(requests.userDetails)
    .then(response => {
      sessionStorage.setItem('userType', response.data.is_trainer ? 'trainer' : 'client');
      sessionStorage.setItem('userDetails', JSON.stringify(response.data));
    }).catch(error => {
      console.log(error.details);
    })
  }, [])

  const details = JSON.parse(sessionStorage.getItem('userDetails'));

  const phone_number = [
    details.phone_number.slice(0, 3), " ",
    details.phone_number.slice(3, 6), " ",
    details.phone_number.slice(6, 9)]
    .join('');

  return (
    <div className='trainerProfile'>
      <h1>Your profile</h1>
      <div className='userInfo'>
        <div className='avatarSection'>
          <div className='empty'></div>
          <div className='trainerProfilePicture'>
            <ApiPicture src={details.avatar_url} />
          </div>
          <div className='notifications-rating'>
            <div className='icons'>
              <Tooltip title='Notifications'>
                <NotificationsNoneOutlinedIcon className='icon' style={{cursor: 'pointer'}} onClick={() => navigate('/notifications')}/>
              </Tooltip>
              <Tooltip title='Edit your profile'>
                <EditOutlinedIcon className='icon'  style={{cursor: 'pointer'}} onClick={goToEditProfile}/>
              </Tooltip>
            </div>
            <Tooltip title='Your average rating'>
              <div className='rating'>
                <p>4.5/5</p>
                <StarIcon className='starIcon' />
              </div>
            </Tooltip>
          </div>
        </div>
        <h2>{details.username}</h2>
        <h2>
          {phone_number}
        </h2>
      </div>
      <div className='opinionList'>
        <h3 className='opinionListHeader'>Your ratings</h3>
        <OpinionAboutTrainerElement 
          imageSrc={woman} 
          name='Jessica' 
          rating={4.5} 
          opinion='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        />
        <OpinionAboutTrainerElement 
          imageSrc={woman} 
          name='Samantha' 
          rating={4.5} 
          opinion='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        />
      </div>
    </div>
  )
}

export default TrainerProfile