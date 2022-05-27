import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../../axios';
import ApiPicture from '../../../Components/ApiPicture';
import TrainerDogElement from '../../../Components/TrainerDogElement/TrainerDogElement';
import requests from '../../../requests';
import './TrainerOwnerProfile.css';

const TrainerOwnerProfile = () => {
  
  const params = useParams();
  
  const [userDetails, setUserDetails] = useState({});
  const [userDogs, setUserDogs] = useState([]);

  useState(() => {
    instance.get(`${requests.getUserDetailsForTrainer}${params.id}/`)
    .then(response => setUserDetails(response.data));
  }, []);

  useState(() => {
    instance.get(`${requests.getUserDogsForTrainer}${params.id}/`)
    .then(response => setUserDogs(response.data));
  }, []);

  // console.log(userDetails);
  // console.log(userDogs);

  const url = instance.defaults.baseURL.slice(0, -5);

  const dogList = userDogs.map(e => <TrainerDogElement key={e.pk} id={e.pk}/>)

  if(!userDetails) {
    return (
      <div>There is no such user.</div>
    )
  } else {
    return (
      <div className='TrainerOwnerProfile'>
      <h1>{userDetails.username}'s profile</h1>
      <div className='userInfo'>
          <div className='avatarSection'>
            <div className='profilePicture'>
              <ApiPicture src={userDetails.avatar_url} />
            </div>
          </div>
          <h2>
            {userDetails.phone_number}
          </h2>
        </div>
        {userDogs.length > 0 && <h3 className='dogListTitle'>{userDetails.username}'s dogs</h3>}
        <div className='dogList'>
          {userDogs.length === 0 && <h3 className='dogListTitle'>{userDetails.username} has not added any dogs yet</h3>}
          {userDogs.length > 0 && dogList}
        </div>
      </div>
    )
  }
}

export default TrainerOwnerProfile;