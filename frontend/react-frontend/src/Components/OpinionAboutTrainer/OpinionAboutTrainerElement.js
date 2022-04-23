import React from "react";
import StarIcon from '@mui/icons-material/Star';
import './OpinionAboutTrainerElement.css';

const OpinionAboutTrainerElement = ({ imageSrc, name, rating, opinion }) => {
  return (
    <div className='opinionAboutElement'>
        <div className="opinionHeader">
            <div className="pictureContainer">
                <img src={imageSrc} alt='' />
            </div>
            <h2 className="authorName">{name}</h2>
        </div>
        <div className="opinionDescription">
            <p>{opinion}</p>
        </div>
        <div className="opinionFooter">
            <p>{rating}/5</p>
            <StarIcon className='starIcon'/>
        </div>
    </div>
  )
}

export default OpinionAboutTrainerElement