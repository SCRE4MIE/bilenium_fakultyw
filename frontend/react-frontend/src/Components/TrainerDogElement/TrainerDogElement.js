import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import requests from '../../requests'
import './TrainerDogElement.css';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { PetsOutlined } from '@mui/icons-material';

const TrainerDogElement = ({ id }) => {

  const [dogInfo, setDogInfo] = useState({});

  const navigate = useNavigate();

  const navigateToDogProfile = () => {
    sessionStorage.setItem('currentDog', id);
    const userType = JSON.parse(sessionStorage.getItem('userDetails')).is_trainer;

    if(userType) {
      navigate('/trainerDogProfile');
    } else {
      navigate('/dogProfile');
    }
  }

  useEffect(() => {
    instance.get(`${requests.getDog}${id}/`)
    .then(response => setDogInfo(response.data))
  }, []);

  const url = instance.defaults.baseURL.slice(0, -5);

  return (
    <Tooltip title={`Go to ${dogInfo.name}'s profile`}>
    <div className='trainerDogElement' onClick={navigateToDogProfile}>
      <div className='dogImage'>
        {
          dogInfo.avatar_url ?
          <img src={`${url}${dogInfo.avatar_url}`} alt='' />
          : <PetsOutlined style={{alignSelf: 'center', fontSize: '30px', padding: '5px', color: 'lightgray'}}/>
        }
      </div>

      <p>{dogInfo.name}</p>
    </div>
    </Tooltip>
  )
}

export default TrainerDogElement