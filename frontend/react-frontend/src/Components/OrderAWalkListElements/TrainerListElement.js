import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

const TrainerListElement = ({id, avatar, name, rating, chooseTrainer, current, disable}) => {

  const [selected, setSelected] = useState(false);

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

  let averageRating = 0;

  if (rating.length > 0) {
    rating.forEach(element => {
      averageRating += Number(element);
    });
    averageRating = averageRating / rating.length;
  } 

  return (
    <div style={selected ? {backgroundColor: '#ffd87d',} : {backgroundColor: 'white'} } className='trainerListElement' id={id} onClick={handleSelect}>
      <div>
        <Avatar src={avatar}/>
        <p>{name}</p>
        <p>{averageRating}</p>
      </div>
    </div>
  )
}

export default TrainerListElement