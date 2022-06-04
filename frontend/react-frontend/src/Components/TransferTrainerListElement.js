import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import instance from '../axios';
import requests from '../requests';
import StarIcon from '@mui/icons-material/Star';
import { Star } from '@mui/icons-material';

const TransferTrainerListElement = ({id, avatar, name, rating, chooseTrainer, current, disable, startDate}) => {

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

  if (rating?.length > 0) {
    rating.forEach(element => {
      averageRating += Number(element.value);
    });
    averageRating = averageRating / rating.length
  } 

  const date = dayjs(startDate);

  useEffect(() => {
    instance.post(requests.trainerAvailible, {
      trainer_id: id,
      date_start: date,
      date_end: date.add(1, 'hour').subtract(1, 'minute'),
    }).then(response => {
      if (response.data.is_available === false) {
        setIsAvailible(false);
      }
    })
  }, [])

  return (
    <div style={
      isAvailible ? selected ? {backgroundColor: '#ffd87d', alignItems: 'center'} : {backgroundColor: 'white'} : {display: 'none'}
      }
      className='trainerListElement' id={id} onClick={handleSelect}>
      <div>
        <Avatar src={avatar}/>
        <p className='name'>{name}</p>
        {averageRating > 0 && <p className='rating'
        style={{display:'flex', alignItems:'center'}}><span>{rating ? `${averageRating}/5`: null} </span><StarIcon style={{color: '#F9C74F'}}/></p>}
        {averageRating === 0 && <p className='rating'>No opinions</p>}
      </div>
    </div>
  )
}

export default TransferTrainerListElement