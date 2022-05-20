import { useEffect, useState } from 'react';
import instance from '../axios';
import requests from '../requests';

const useIncomingWalks = (id) => {
  
  const dayjs = require("dayjs");
  const today = dayjs();

  const [walks, setWalks] = useState([]);

  const incomingWalks = walks.filter(e => {
    const startDate = dayjs(e.date);
    return startDate > today;
  })

  useEffect(() => {
    instance.get(`${requests.getTrainerWalks}${id}/`)
    .then(response => {
      setWalks(response.data);
    })
  }, [])

  return incomingWalks;
}

export default useIncomingWalks;