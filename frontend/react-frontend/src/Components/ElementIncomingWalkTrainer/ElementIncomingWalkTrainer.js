import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import requests from '../../requests'
import PersonIcon from '@mui/icons-material/Person';
import './ElementIncomingWalkTrainer.css';
import ApiPicture from '../ApiPicture';

const ElementIncomingWalkTrainer = ({ id }) => {

  const [trainerInfo, setTrainerInfo] = useState({})

  useEffect(() => {
    instance.get(`${requests.trainerDetails}${id}/`)
    .then(response => setTrainerInfo(response.data))
  }, []);

  return (
    <div className='trainerElement'>
      <div className='trainerImage'>
        {
          trainerInfo.avatar_url ?
          < ApiPicture src={trainerInfo.avatar_url} />
          : <PersonIcon style={{alignSelf: 'center', fontSize: '40px', color: 'lightgray'}}/>
        }
      </div>

      <p>{trainerInfo.username}</p>
    </div>
  )
}

export default ElementIncomingWalkTrainer