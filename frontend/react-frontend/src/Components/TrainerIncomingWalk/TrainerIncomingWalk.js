import React, {useState} from 'react';
import { Alert } from '@mui/material';
import TrainerDogElement from '../TrainerDogElement/TrainerDogElement';
import './TrainerIncomingWalk.css';
import { useNavigate } from 'react-router-dom';
import TransferAWalk from '../../Flows/TrainerFlow/TransferAWalk/TransferAWalk';

const TrainerIncomingWalk = ({ id, startDate, endDate, dogs}) => {

  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))

  const navigate = useNavigate();

  const [toggleTransfer, setToggleTransfer] = useState(false);

  const dayjs = require('dayjs');
  const today = dayjs();

  const dogElements = dogs.map(e => (
    <TrainerDogElement key={e} id = {e} />
  ));

  const before24h = dayjs(startDate).diff(today, 'hour') > 24;

  return (
    <div className='trainerIncomingWalk'>
      <div className='dogElements'>
        <p>Dogs: </p>
        <div className='dogs'>
          {dogElements}
        </div>
      </div>
      <div className='line'></div>
      <div className='info'>
        <p>Date of the walk: {dayjs(startDate).format('DD/MM/YYYY')}</p>
        <p>
          Start: {dayjs(startDate).subtract(1, 'minute').format('hh:mm')} - {dayjs(endDate).format('hh:mm')} : End
        </p>
        {before24h ? <button className='button' onClick={() => setToggleTransfer(prev => !prev)}>Transfer to a different trainer</button> :
        <Alert severity="info" style={{letterSpacing: '1px', width: '100%', borderRadius: '0px 0px 10px 10px', marginBottom: '-16px', justifyContent: 'center'}}>Transfer unavailable</Alert>}
      </div>
      {toggleTransfer && <TransferAWalk toggleModal={setToggleTransfer} myId={userDetails.pk} walkData={{id:id, startDate:startDate, endDate:endDate, dogs:dogs}}/>}
    </div>
  )
}

export default TrainerIncomingWalk;