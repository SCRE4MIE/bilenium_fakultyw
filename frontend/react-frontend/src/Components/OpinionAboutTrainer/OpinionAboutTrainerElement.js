import React from "react";
import StarIcon from '@mui/icons-material/Star';
import './OpinionAboutTrainerElement.css';
import ApiPicture from "../ApiPicture";

const OpinionAboutTrainerElement = ({ avatar, username, value, comment }) => {
  return (
    <div className='opinionAboutElement'>
        <div className="opinionHeader">
            <div className="pictureContainer">
                <ApiPicture src={avatar} />
            </div>
            <h2 className="authorName">{username}</h2>
        </div>
        <div className="opinionDescription">
            <p>{comment}</p>
        </div>
        <div className="opinionFooter">
            <p>{value}/5</p>
            <StarIcon className='starIcon' style={{color: '#F9C74F'}}/>
        </div>
    </div>
  )
}

export default OpinionAboutTrainerElement