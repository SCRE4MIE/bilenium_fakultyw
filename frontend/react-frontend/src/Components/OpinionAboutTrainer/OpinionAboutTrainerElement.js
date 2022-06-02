import React from "react";
import StarIcon from '@mui/icons-material/Star';
import './OpinionAboutTrainerElement.css';
import ApiPicture from "../ApiPicture";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OpinionAboutTrainerElement = ({ avatar, username, value, comment, id }) => {

  const text = `Go to ${username}'s profile`;

  const navigate = useNavigate();

  const goToClientProfile = () => {
    navigate(`/ownerProfile/${id}`);
  }
  
  return (
    <div className='opinionAboutElement'>
        <Tooltip title={text}  placement="bottom-start">
            <div className="opinionHeader" onClick={goToClientProfile}>
                <div className="pictureContainer">
                    <ApiPicture src={avatar} />
                </div>
                <h2 className="authorName">{username}</h2>
            </div>
        </Tooltip>
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