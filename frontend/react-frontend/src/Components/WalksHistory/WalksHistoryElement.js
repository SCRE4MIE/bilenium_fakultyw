import React, { useState, useEffect } from 'react';
import './WalksHistoryElement.css';
import { useNavigate } from 'react-router-dom';
import requests from '../../requests';
import instance from '../../axios';
import useOwnerDogs from '../../CustomHooks/useOwnerDogs';
import ApiPicture from '../ApiPicture';
import DogsListComp
 from './DogsListComp/dogsListComp';
const WalksHistoryElement= ({dogs, trainer, date, date_end }) => {
    const dayjs = require("dayjs");
    const navigate = useNavigate();
    const userDogs = useOwnerDogs();
    const [trainerDetails, setTrainerDetails] = useState();
    const [dogsDetails, setDogsDetails]= useState([{}]);
    const startDate = dayjs(date).format('DD-MM-YYYY');
    const startHour = dayjs(date).subtract(1, "minute").format('HH:mm');
    const endtHour = dayjs(date_end).format('HH:mm');
 

    const getDogs= () => {
      for (var i = 0; i < dogs.length; i++) {
      instance.get(`${requests.getDog}${dogs[i]}/`)
      .then(response => {
        setDogsDetails([...dogsDetails, response.data]);
      }).catch(error => {
        console.log(error.details);
    })
     }
    };
    useEffect(() => {
      getDogs();
      }, [dogs]);
    useEffect(() => {
    instance.get(`${requests.trainerDetails}${trainer}/`)
      .then(response => {
        setTrainerDetails(response.data);
      }).catch(error => {
        console.log(error.details);
    })
    }, []);
    return(
        <>
        {trainerDetails ? 
        <div className='walksHistoryElement' onClick={()=>{navigate("rateTrainer", {state:{trainerName: trainerDetails.username, trainerId: trainer}})}}>
        <div className='dogContainer'>
        {dogsDetails.map((dog) => <DogsListComp  key = {dog.id} dogImage={dog.image_url} dogName={dog.name} />)}
       </div>
       <hr className='line'></hr>
       <div className='trainerContainer'>
         <div className='dog'><h2>Trainer:</h2></div>
         <div className='dogNameImage'>
             <div className='dogImage'>
             <ApiPicture className='img' src={trainerDetails.avatar_url} />
             </div>
             <div className='dogName'>
                 <h2>{trainerDetails.username}</h2>
             </div>
         </div>
       </div>
       <div className='walkSlotContainer'>
         <h2>{startDate}</h2>
         <h2>{startHour} - {endtHour}</h2>
       </div>
     </div> 
     :""}
     </>
    
)
};
export default WalksHistoryElement;
