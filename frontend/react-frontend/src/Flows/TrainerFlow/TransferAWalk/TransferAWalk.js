import React, { useState } from 'react';
import instance from '../../../axios';
import useTrainerList from '../../../CustomHooks/useTrainerList';
import './TransferAWalk.css';
import { Accordion, AccordionSummary, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import TransferTrainerListElement from '../../../Components/TransferTrainerListElement';
import requests from '../../../requests';

const TransferAWalk = ({toggleModal, walkData, myId}) => {

  const toggle = () => {
    toggleModal();
  };

  const [activeTrainer, setActiveTrainer] = useState({});

  const clearTrainer = () => {
    const elements = document.getElementsByClassName('trainerListElement');
    for(let i = 0; i < elements.length; i++){
      elements[i].style.backgroundColor = "white";
    }
    setActiveTrainer({});
  }

  const chooseTrainer = (id, avatar, name, rating) => {
    setActiveTrainer({id: id, component: <TransferTrainerListElement id={id} avatar={avatar} name={name} disable={true}/>});
  }  

  const trainersUnfiltered = useTrainerList();
  const trainersFiltered = trainersUnfiltered.filter(e => {return myId !== e.pk})

  const trainers = trainersFiltered.map(e => {
    return <TransferTrainerListElement
      key={e.pk}
      id={e.pk}
      avatar={`${instance.defaults.baseURL.substring(0, instance.defaults.baseURL.length - 4)}${e.avatar_url?.substring(1)}`}
      name={e.username}
      rating={e.rating_trainer}
      chooseTrainer={chooseTrainer}
      current={activeTrainer.id}
      startDate={walkData.startDate}
    />
  });

  const transfer = () => {
    instance.patch(`${requests.updateWalk}${walkData.id}/`, {
      date: walkData.startDate,
      date_end: walkData.endDate,
      trainer: activeTrainer.id,
      dogs: walkData.dogs
    }).then(response => {console.log(response.data)});

    window.location.reload();
  }

  return (
    <div className='transferModal'>
      <div className='transferAWalk'>
        <h2>Transfer this Walk</h2>

        <Accordion>
          <AccordionSummary
            className='summary'
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{margin: '0'}}
          >
          {activeTrainer.component ? activeTrainer.component : "Choose a different Trainer"}
          <ClearIcon style={{alignSelf: 'center', marginLeft: '70px', marginRight: '30px'}} onClick={clearTrainer} className='clearIcon'/>
          </AccordionSummary>
          {trainers}
        </Accordion>

        <div className='buttons'>
          <button className='button' onClick={transfer}>Transfer</button>
          <button className='button' onClick={toggle}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default TransferAWalk