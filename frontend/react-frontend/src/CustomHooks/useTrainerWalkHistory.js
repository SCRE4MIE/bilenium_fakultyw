import { useEffect, useState } from 'react';
import instance from '../axios';
import requests from '../requests';

const useTrainerWalkHistory = (id) => {
  
  const dayjs = require("dayjs");
  const today = dayjs();

  const [walks, setWalks] = useState([]);

  const incomingWalks = walks.filter(e => {
    const endDate = dayjs(e.date_end);
    return endDate < today;
  })

  useEffect(() => {
    instance.get(`${requests.getTrainerWalks}${id}/`)
    .then(response => {
      setWalks(response.data);
    })
  }, [])

  return incomingWalks;
}

export default useTrainerWalkHistory;