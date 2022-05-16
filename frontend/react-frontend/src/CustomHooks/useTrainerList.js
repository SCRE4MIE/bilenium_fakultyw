import { useEffect, useState } from 'react'
import instance from '../axios';
import requests from '../requests';

const useTrainerList = () => {

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    instance.get(requests.trainerList)
    .then(response => setTrainers(response.data))
    .catch(error => console.log(error.repsonse.data));
  }, [])

  return trainers;
}

export default useTrainerList