import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import instance from '../../../axios';
import requests from '../../../requests';
import { styled } from '@mui/material/styles';
import './RateTrainer.css';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ApiPicture from "../../../Components/ApiPicture";

const RateTrainer = () => {
    const details = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate();
    const {state} = useLocation();
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState("")
    const [trainerDetails, setTrainerDetails] = useState({});
    let ev = {
    "username": details.username,
    "email": details.email,
    "first_name": details.first_name,
    "last_name": details.last_name,
    "phone_number": details.phone_number,
    "is_trainer": details.is_trainer,
    }
    const ratingSum = (ratingArr) => {
      let rating = 0;
      for (let index = 0; index < ratingArr.length; ++index) {
      rating = rating + ratingArr[index].value;
      }
      return Math.round((rating/ratingArr.length)*100)/100;
  };
    useEffect(() => {
     instance.get(`${requests.trainerDetails}${state.trainerId}`)
      .then(response => {
        console.log(response);
        setTrainerDetails(response.data);
      }).catch(error => {
        console.log(error.details);
    })
    }, []);
    const handleSubmit = () => {
    console.log("state.trainerId", state.trainerId);
    let formData = new FormData();
    formData.append("value", stars );
    formData.append("comment", comment);
    formData.append("trainer", state.trainerId);
    formData.append("evaluator", ev);

    instance.post(requests.rateTrainer, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json',
      },
    }).then(response => {
      navigate("/trainerRated", {state: {trainerName: state.trainerName}});
    });
  }

    return(
    <div className='container'>
        <div className='rate'>
            <h1>Rate {state.trainerName}</h1>
        </div>
        <div className='stars'>
            <Rating
              name="customized-color"
              icon={<StarIcon fontSize="large" />}
              emptyIcon={<StarBorderIcon fontSize="large" />}
              value={stars}
                onChange={(e, newValue) => {
                setStars(newValue);
                }}
            />
        </div>
        <div className='comment'>
            <textarea className='input' type={"textarea"} placeholder="Opinion" value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
        </div>
            <button className='button' onClick={()=> handleSubmit()}>Rate</button>
        <div className='trainerImageRating'>
            <div className='trainerImage'>
                <ApiPicture className='img' src={trainerDetails.avatar_url} />
            </div>
            <div className='trainerRatingWithStar'>
              <div className='trainerRating'>
                <h2>{trainerDetails.rating_trainer && !isNaN(ratingSum(trainerDetails.rating_trainer)) ? ratingSum(trainerDetails.rating_trainer)+"/5": "No rating"}</h2>
              </div>
              <div className='trainerStar'>
                 <h2><StarBorderIcon fontSize='large'/></h2>
              </div>
            </div>
        </div>
    </div>
    );
};
export default RateTrainer;