import React, { useEffect, useState } from 'react';
import instance from '../axios';
import requests from '../requests';

const useCheckSlots = (id, startDate) => {

  const [walks, setWalks] = useState([]);

  useEffect(() => {
    if (id) {
      instance.get(`${requests.getTrainerWalks}${id}/`)
      .then((response) => {
        setWalks(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      })
    }

  }, [id]);

  const foundId = walks?.filter(e => {
    return e.date.substring(0, 19) === startDate;
  });

  return foundId;

}

export default useCheckSlots;