import React, { useEffect, useState } from 'react'
import instance from '../../axios'
import requests from '../../requests'
import PersonIcon from '@mui/icons-material/Person';
import './TrainerDogElement.css';

const TrainerDogElement = ({ id }) => {

  const [dogInfo, setDogInfo] = useState({})

  useEffect(() => {
    instance.get(`${requests.getDog}${id}/`)
    .then(response => setDogInfo(response.data))
  }, []);

  return (
    <div className='trainerDogElement'>
      <div className='dogImage'>
        {
          dogInfo.avatar ?
          <img src={dogInfo.avatar} alt='' />
          : <PersonIcon style={{alignSelf: 'center', fontSize: '40px', color: 'lightgray'}}/>
        }
      </div>

      <p>{dogInfo.name}</p>
    </div>
  )
}

export default TrainerDogElement