import { Tooltip } from '@mui/material';
import './TrainerProfile.css';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import StarIcon from '@mui/icons-material/Star';
import OpinionAboutTrainerElement from '../../../Components/OpinionAboutTrainer/OpinionAboutTrainerElement';
import ApiPicture from '../../../Components/ApiPicture';
import { useEffect, useState } from 'react';
import instance from '../../../axios';
import requests from '../../../requests';
import { useNavigate } from 'react-router-dom';
import TrainerAvailibility from '../../../Components/TrainerAvailibility/TrainerAvailibility';

const TrainerProfile = () => {

  const navigate = useNavigate();


  const [notificationCount, setNotificationCount] = useState();
  const [availibility, setAvailibility] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  })

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
  const rating_trainer_arr = trainer ? Object.values(trainer.rating_trainer).reverse() : null;
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

  useEffect(() => {
    instance.get(requests.getNotificationCount)
    .then(response => setNotificationCount(response.data.count));
  }, []);

  useEffect(() => {
    instance.get(`${requests.getTrainerWorkDaysByUser}${currentTrainerId}/`)
    .then(response => setAvailibility(response.data[0]));
  }, [currentTrainerId]);

  const tooltip = `You have ${notificationCount} unread notifications.`;

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
              <div>
                <Tooltip title={notificationCount ? tooltip : 'There are no new notifications'}>
                  <NotificationsNoneOutlinedIcon className='icon' style={{cursor: 'pointer'}} onClick={() => navigate('/notifications')}/>
                </Tooltip>
                {notificationCount && <div className='notificationCount'>{notificationCount}</div>}
              </div>
              <div>
                <Tooltip title='Edit your profile'>
                  <EditOutlinedIcon className='icon'  style={{cursor: 'pointer'}} onClick={goToEditProfile}/>
                </Tooltip>
                {notificationCount && <div className='notificationCountEpmty'>{notificationCount}</div>}
              </div>
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
                    <StarIcon className='starIconTrainer' style={{color: '#F9C74F'}}/>
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
          <TrainerAvailibility trainer={true} availibility={availibility} username={details.username}/>
      </div>
      {trainer ?
      <>
      <div className="opinionsHeader">
          <h3 className='opinionListTitle'>Your ratings:</h3>
      </div>
      <div className="opinionList">
        {trainer.rating_trainer.length !== 0 ? (
          <>
          {rating_trainer_arr.map((item) => (
          <OpinionAboutTrainerElement
          key = {item.pk}
          id = {item.evaluator.pk}
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