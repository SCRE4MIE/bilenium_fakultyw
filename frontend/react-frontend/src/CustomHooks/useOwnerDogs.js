import { useState, useEffect } from 'react';
import instance from '../axios';
import requests from '../requests';

function useOwnerDogs() {

  const [userDogs, setUserDogs] = useState([]);

  useEffect(() => {
    instance.get(requests.ownerDogList)
    .then(response => setUserDogs(response.data));
  }, [])

  return userDogs;
}

export default useOwnerDogs