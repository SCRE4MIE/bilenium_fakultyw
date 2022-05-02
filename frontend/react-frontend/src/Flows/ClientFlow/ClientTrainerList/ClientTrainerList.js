import React, { useEffect, useState } from 'react'
import './ClientTrainerList.css'
import TrainerList from '../../../Components/ClientTrainerList/TrainerList';
import instance from '../../../axios';
import requests from '../../../requests';

const ClientTrainerList = () => {
  const [trainerList, setTrainerList] = useState({});
  const trainers = trainerList.trainerList;

  useEffect(() => {
     instance.get(requests.trainerList)
    .then(response => {

      setTrainerList(prevUserData => ({
        ...prevUserData,
        trainerList: response.data,
      }));

    }).catch(error => {
      console.log(error.details);
    })
  }, []);

  return (
    <div className='clientTrainerList'>
      <TrainerList trainers={trainers}/>
    </div>

  )
}

export default ClientTrainerList