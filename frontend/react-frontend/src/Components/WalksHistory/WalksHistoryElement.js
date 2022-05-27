import React, { useState, useEffect } from 'react';
import './WalksHistoryElement.css';
import { useNavigate } from 'react-router-dom';
import requests from '../../requests';
import instance from '../../axios';
import useOwnerDogs from '../../CustomHooks/useOwnerDogs';
import ApiPicture from '../ApiPicture';
import TrainerDogElement from '../../Components/TrainerDogElement/TrainerDogElement';
import ElementIncomingWalkTrainer from '../ElementIncomingWalkTrainer/ElementIncomingWalkTrainer';
import { StarBorder } from '@mui/icons-material';


const WalksHistoryElement= ({dogs, trainer, date, date_end }) => {
    const dayjs = require("dayjs");
    const navigate = useNavigate();
    const userDogs = useOwnerDogs().map(e => e.pk);
    const [trainerDetails, setTrainerDetails] = useState();
    const startDate = dayjs(date).format('DD-MM-YYYY');
    const startHour = dayjs(date);
    const endtHour = dayjs(date_end);
 
    useEffect(() => {
    instance.get(`${requests.trainerDetails}${trainer}/`)
      .then(response => {
        setTrainerDetails(response.data);
      }).catch(error => {
        console.log(error.details);
    })
    }, []);

    const filterDogs = dogs.filter(e => {
      return userDogs.includes(e);
    });

    return(
        <>
        {trainerDetails ? 
        <div className='clientPreviousWalk'>
        <div className='NamesElements'>
          <p>Dogs: </p>
          <div className='names'>
            {filterDogs.map((dog) => <TrainerDogElement key={dog} id={dog}/>)}
          </div>
        </div>
        <div className='line'></div>
        <div className='info'>
          <p>Date of the walk: {dayjs(startHour).format('DD/MM/YYYY')}</p>
          <p>
            Started at: {dayjs(startHour).subtract(1, 'minute').format('hh:mm')}
          </p>
          <p>
            Ended at: {dayjs(endtHour).format('hh:mm')}
          </p>
        </div>
        <div className='line'></div>
        <div className='NamesElements'>
          <div className='trainer'>
            <ElementIncomingWalkTrainer key={trainerDetails.pk} id = {trainerDetails.pk} />
            <button className='buttonUser' 
          onClick={()=>{navigate("rateTrainer", {state:{trainerName: trainerDetails.username, trainerId: trainer}})}}>
            <p>Rate</p>
            <StarBorder style={{fontSize:'24px'}}/>
          </button>
          </div>
        </div>
      </div>
    //     <div className='walksHistoryElement' onClick={()=>{navigate("rateTrainer", {state:{trainerName: trainerDetails.username, trainerId: trainer}})}}>
    //     <div className='dogContainer'>
    //     {filterDogs.map((dog) => <TrainerDogElement key={dog} id={dog}/>)}
    //    </div>
    //    <hr className='line'></hr>
    //    <div className='trainerContainer'>
    //      <div className='dog'><h2>Trainer:</h2></div>
    //      <div className='dogNameImage'>
    //          <div className='dogImage'>
    //          <ApiPicture className='img' src={trainerDetails.avatar_url} />
    //          </div>
    //          <div className='dogName'>
    //              <h2>{trainerDetails.username}</h2>
    //          </div>
    //      </div>
    //    </div>
    //    <div className='walkSlotContainer'>
    //      <h2>{startDate}</h2>
    //      <h2>{startHour} - {endtHour}</h2>
    //    </div>
    //  </div> 
     : null}
     </>
    
)
};
export default WalksHistoryElement;
