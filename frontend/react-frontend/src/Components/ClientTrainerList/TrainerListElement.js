import React, { useState } from "react";
import './TrainerListElement.css'
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import ApiPicture from "../ApiPicture";

const TrainerListElement = ({ imageSrc, name, id, rating_trainer }) => {

  const navigate = useNavigate();
  const openTrainerProfile = () => {
    sessionStorage.setItem('currentTrainer', id);
    navigate('/trainerProfile');
  };

  const ratingSum = (ratingArr) => {
    let rating = 0;
    for (let index = 0; index < ratingArr.length; ++index) {
      rating = rating + ratingArr[index].value;
    }
    return Math.round((rating/ratingArr.length)*100)/100;
  };

  return (
    <div className='trainerListElement' onClick={openTrainerProfile}>
       <div className='trainerPictureContainer'>
         <ApiPicture src={imageSrc} />
      </div>
      <p className='trainerName'>{name}</p>
      <span>
        {isNaN(ratingSum(rating_trainer)) ?
        <p className="trainerRating">No opinion yet</p>
        :
        <>
          <p className="trainerRating">{ratingSum(rating_trainer)}/5</p>
          <StarIcon className='starIcon'/>
        </>}
      </span>
    </div>
  )
}

export default TrainerListElement