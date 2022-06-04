import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import instance from '../../axios';
import requests from '../../requests';
import { Person, Star } from '@mui/icons-material';


const TrainerListElement = ({id, avatar, name, rating, chooseTrainer, current, disable, startDate}) => {


  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    instance.get(`${requests.getTrainerWorkDaysByUser}${id}/`)
    .then(response => {
      startDate ? setIsAvailible(response.data[0][weekDays[startDate.day()]]) : setIsAvailible(true);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate])

  let averageRating = 0;

  if (rating.length > 0) {
    rating.forEach(element => {
      averageRating += Number(element.value);
    });
    averageRating = averageRating / rating.length;
  } 

  const style = {
    backgroundColor: selected ?  '#ffd87d' : 'white',
    display: isAvailible ? 'flex' : 'none',
    border: disable && 'none'
  }

  const avatarSplit = avatar.split('/');
  const avatarExists = avatarSplit[avatarSplit.length-1] !== 'undefined';

  return (
    <div style={
      style
      }
      className='trainerListElement' id={id} onClick={handleSelect}>
    <div>
        {avatarExists && <Avatar src={avatar}/>}
        {!avatarExists && <Person style={{fontSize:'30px', padding: '5px', backgroundColor: 'gray', color: 'lightgray', borderRadius: '50%'}} />}
        <p>{name}</p>
        {averageRating > 0 && 
        <p className='rating'><span>{`${averageRating}/5`}</span> <Star style={{color: '#F9C74F'}}/></p>
        }
        {averageRating === 0 && <p className='rating'>No opinions</p>}
      </div>
    </div>
  )
}

export default TrainerListElement