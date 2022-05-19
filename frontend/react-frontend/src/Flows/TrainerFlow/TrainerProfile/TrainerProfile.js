import { Tooltip } from '@mui/material';
import React, {useState} from 'react';
import './TrainerProfile.css';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import woman from '../../../Images/womanPlaceholder.jpg';
import StarIcon from '@mui/icons-material/Star';
import OpinionAboutTrainerElement from '../../../Components/OpinionAboutTrainer/OpinionAboutTrainerElement';
import ApiPicture from '../../../Components/ApiPicture';
import { useEffect, useState } from 'react';
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
      sessionStorage.setItem('currentTrainer', JSON.stringify(response.data.pk));
    }).catch(error => {
      console.log(error.details);
    });
  }, []);

  const details = JSON.parse(sessionStorage.getItem('userDetails'));
  const currentTrainerId = details.pk;
  const [trainerDetails, setTrainerDetails] = useState({});
  const trainer = trainerDetails.trainerDetails;
  useEffect(() => {
    instance.get(requests.trainerDetails + currentTrainerId.toString())
        .then(response => {

        setTrainerDetails(prevUserData => ({
            ...prevUserData,
            trainerDetails: response.data,
        }));

        }).catch(error => {
        console.log(error.details);
        })
  }, [])

  const ratingSum = (ratingArr) => {
      let rating = 0;
      for (let index = 0; index < ratingArr.length; ++index) {
      rating = rating + ratingArr[index].value;
      }
      return Math.round((rating/ratingArr.length)*100)/100;
  };

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
                <NotificationsNoneOutlinedIcon className='icon'  style={{cursor: 'pointer'}}/>
              </Tooltip>
              <Tooltip title='Edit your profile'>
                <EditOutlinedIcon className='icon'  style={{cursor: 'pointer'}} onClick={goToEditProfile}/>
              </Tooltip>
            </div>
            <Tooltip title='Your average rating'>
              <div className='rating'>
                {trainer ?
                  <>
                  {isNaN(ratingSum(trainer.rating_trainer)) ?
                  <p className="trainerRating">No opinion yet</p>
                  :
                  <>
                    <p>{ratingSum(trainer.rating_trainer)}/5</p>
                    <StarIcon className='starIconTrainer' />
                  </>}
                  </>
                : null}
              </div>
            </Tooltip>
          </div>
        </div>
        <h2>{details.username}</h2>
        <h2>
          {phone_number}
        </h2>
      </div>
      {trainer ?
      <>
      <div className="opinionsHeader">
          <h3 className='opinionListTitle'>Your ratings:</h3>
      </div>
      <div className="opinionList">
        {trainer.rating_trainer.length !== 0 ? (
          <>
          {trainer.rating_trainer.map((item) => (
          <OpinionAboutTrainerElement
          key = {item.pk}
          id = {item.pk}
          username = {item.evaluator.username}
          comment = {item.comment}
          value = {item.value}
          avatar = {item.evaluator.avatar_url}/>
          ))}
          </>
          ) : (
          <div className="noOpinion">
              <h3>You have no opinions yet</h3>
          </div>
          )}
      </div></> : null }
    </div>
  )
}

export default TrainerProfile