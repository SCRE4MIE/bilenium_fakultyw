import React from "react";
import './TrainerListElement.css'
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

const TrainerListElement = ({ imageSrc, name, id, rating }) => {

  const navigate = useNavigate();

  const openTrainerProfile = () => {
    sessionStorage.setItem('currentTrainer', id);
    navigate('/trainerProfile');
  };

  return (
    <div className='trainerListElement' onClick={openTrainerProfile}>
       <div className='trainerPictureContainer'>
        <img src={imageSrc} alt='' />
      </div>
      <p className='trainerName'>{name}</p>
      <span>
        <p className="trainerRating">{rating}/5</p>
        <StarIcon className='starIcon'/>
      </span>
    </div>
  )
}

export default TrainerListElement