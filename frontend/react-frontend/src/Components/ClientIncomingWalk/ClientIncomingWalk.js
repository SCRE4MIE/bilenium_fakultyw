import React, {useState, useEffect} from 'react';
import TrainerDogElement from '../TrainerDogElement/TrainerDogElement';
import './ClientIncomingWalk.css';
import { useNavigate } from 'react-router-dom';
import ElementIncomingWalkTrainer from '../ElementIncomingWalkTrainer/ElementIncomingWalkTrainer';
import instance from '../../axios';
import requests from '../../requests';
import { Alert } from '@mui/material';
import DeleteWalkModal from '../DeleteWalkModal/DeleteWalkModal';

const ClientIncomingWalk = ({ id, startDate, endDate, dogs, trainerId}) => {

  const [dogsList, setDogList] = useState()
  const [toggleCancel, setToggleCancel] = useState(false);
  const dayjs = require('dayjs');
  const today = dayjs();
  const before24h = dayjs(startDate).diff(today, 'hour') > 24;

  useEffect(() => {
    instance.get(requests.userDogList)
    .then(response => {
      setDogList(response.data);
    })
  }, [])

  const myDogs = dogsList ? dogsList.filter(e => {
      return dogs.includes(e.pk);
  }) : null

  const navigate = useNavigate();

  const dogElements = dogsList? myDogs.map(e => (
    <TrainerDogElement key={e.pk} id = {e.pk} />
  )): null;

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  };

  const openModal = () => {
    setToggleCancel(prev => !prev);
    if (!toggleCancel)
    {
      goToTop();
      document.body.style.overflow = "hidden";
    }
    else
    {
      document.body.style.overflow = "scroll";
    }
  }

  return (
    <div className='clientIncomingWalk'>
      <div className='NamesElements'>
        <p>Dogs: </p>
        <div className='names'>
          {dogElements}
        </div>
      </div>
      <div className='line'></div>
      <div className='NamesElements'>
        <p>Trainer: </p>
        <div className='names'>
          <ElementIncomingWalkTrainer key={trainerId} id = {trainerId} />
        </div>
      </div>

      <div className='info'>
        <p>Date of the walk: {dayjs(startDate).format('DD/MM/YYYY')}</p>
        <p>
          Start: {dayjs(startDate).subtract(1, 'minute').format('hh:mm')} - {dayjs(endDate).format('hh:mm')} : End
        </p>
        {before24h ? <button className='buttonUser' onClick={openModal}>Cancel the walk</button> :
        <Alert severity="info" style={{letterSpacing: '1px', width: '100%', borderRadius: '0px 0px 10px 10px', marginBottom: '-16px', justifyContent: 'center'}}>Cancel unavailable</Alert>}
      </div>
      {toggleCancel && <DeleteWalkModal toggleModal={openModal} walkData={{id:id, startDate:startDate, endDate:endDate, dogs:dogs, myDogs:myDogs, trainerId:trainerId}}/>}
    </div>
  )
}

export default ClientIncomingWalk;