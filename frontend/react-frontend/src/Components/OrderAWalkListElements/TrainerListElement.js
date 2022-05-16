import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import instance from '../../axios';
import requests from '../../requests';

const TrainerListElement = ({id, avatar, name, rating, chooseTrainer, current, disable, startDate}) => {

  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayjs = require('dayjs');

  const [selected, setSelected] = useState(false);

  const [isAvailible, setIsAvailible] = useState(true);

  const handleSelect = () => {

    if(!disable){
      if(!selected){
        const elements = document.getElementsByClassName('trainerListElement'); // get all elements
        for(let i = 0; i < elements.length; i++){
          elements[i].style.backgroundColor = "white";
        };
        setSelected(true)
        chooseTrainer(id, avatar, name, rating);
      }
    }
  }

  useEffect(() => {
    if(current !== id)
      setSelected(false);
  }, [current]);

  useEffect(() => {
    instance.get(`${requests.getTrainerWorkDaysByUser}${id}/`)
    .then(response => {
      startDate ? setIsAvailible(response.data[0][weekDays[startDate.day()]]) : setIsAvailible(true);
    })
  }, [startDate])

  let averageRating = 0;

  if (rating.length > 0) {
    rating.forEach(element => {
      averageRating += Number(element);
    });
    averageRating = averageRating / rating.length;
  } 

  return (
    <div style={
      isAvailible ? selected ? {backgroundColor: '#ffd87d',} : {backgroundColor: 'white'} : {display: 'none'}
      }
      className='trainerListElement' id={id} onClick={handleSelect}>
    <div>
        <Avatar src={avatar}/>
        <p>{name}</p>
        <p>{averageRating}</p>
      </div>
    </div>
  )
}

export default TrainerListElement