import { useEffect, useState } from 'react';
import instance from '../axios';
import requests from '../requests';

const useTrainerActiveWalks = (id) => {

  const dayjs = require("dayjs");
  const today = dayjs();

  const [walks, setWalks] = useState([]);

  let activeWalks = walks.filter((e) => {
    const start = dayjs(e.date);
    const end = dayjs(e.date_end);
    return start <= today && end >= today;
  });

  const unique = [];
  const map = new Map();

  for(const e of activeWalks){
    if(!map.has(e.id)){
      map.set(e.id, true);
      unique.push(e);
    }
  }

  useEffect(() => {
    instance.get(`${requests.getTrainerWalks}${id}/`)
    .then(response => setWalks(response.data));
  }, [])

  return unique;
}

export default useTrainerActiveWalks;