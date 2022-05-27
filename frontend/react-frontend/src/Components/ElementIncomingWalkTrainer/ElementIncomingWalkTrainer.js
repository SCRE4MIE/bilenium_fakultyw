import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import requests from '../../requests'
import PersonIcon from '@mui/icons-material/Person';
import './ElementIncomingWalkTrainer.css';
import ApiPicture from '../ApiPicture';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const ElementIncomingWalkTrainer = ({ id }) => {

  const [trainerInfo, setTrainerInfo] = useState({})

  const navigate = useNavigate();

  const navigateToTrainer = () => {
    sessionStorage.setItem('currentTrainer', id);
    navigate('/trainerProfile');
  }

  useEffect(() => {
    instance.get(`${requests.trainerDetails}${id}/`)
    .then(response => setTrainerInfo(response.data))
  }, []);

  return (
    <Tooltip title={`Go to ${trainerInfo.username}'s profile`}>
    <div className='trainerElement' onClick={navigateToTrainer}>
      <div className='trainerImage'>
        {
          trainerInfo.avatar_url ?
          < ApiPicture src={trainerInfo.avatar_url} />
          : <PersonIcon style={{alignSelf: 'center', fontSize: '40px', color: 'lightgray'}}/>
        }
      </div>

      <p>{trainerInfo.username}</p>
    </div>
    </Tooltip>
  )
}

export default ElementIncomingWalkTrainer