import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './OrderAWalk.css';
import useOwnerDogs from '../../../CustomHooks/useOwnerDogs';
import useTrainerList from '../../../CustomHooks/useTrainerList';
import { Accordion, AccordionSummary, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ClearIcon from '@mui/icons-material/Clear';
import instance from '../../../axios';
import requests from '../../../requests';


const OrderAWalk = () => {

  const dayjs = require('dayjs');

  dayjs().format();
  let date = dayjs().minute(0).second(0);

  const [formData, setFormData] = useState({
    date: date.add(1, 'day'),
    dogs: [],
    trainer: '',
  });

  let minHour = date.hour(8).minute(0).second(0);
  let maxHour = date.hour(17).minute(0).second(0);
  if (formData.date.day() === 0 || formData.date.day() === 6) {
    minHour = date.hour(9).minute(0).second(0);
    maxHour = date.hour(15).minute(0).second(0);
  }

  const [time, setFormTime] = useState(minHour);

  const handleDateChange = (e) => {
    setFormData(prevData => {
      return {
        ...prevData,
        date: e,
      }
    });
  }

  const handleTimeChange = (e) => {
    setFormTime(e);
  }

  const [activeTrainer, setActiveTrainer] = useState({});

  const [activeDog, setActiveDog] = useState([]);

  const [dogCount, setDogCount] = useState(activeDog.length);

  const clearDogs = () => {
    const elements = document.getElementsByClassName('dogListElement'); // get all elements
    for(let i = 0; i < elements.length; i++){
      elements[i].style.backgroundColor = "white";
    }
    setDogCount(0)
    setActiveDog([]);
  }

  const chooseDog = (id, avatar, name, chooseDog) => {
    if(dogCount < 3) {
      setActiveDog(prevDogs => {
        return [...prevDogs, {id: id, component: <DogListElement key={id} id={id} avatar={avatar} name={name}/>}]
      });
      setDogCount(prevDogCount => (prevDogCount + 1))
    }
  };

  const clearTrainer = () => {
    const elements = document.getElementsByClassName('trainerListElement'); // get all elements
    for(let i = 0; i < elements.length; i++){
      elements[i].style.backgroundColor = "white";
    }
    setActiveTrainer({});
  }
  
  const chooseTrainer = (id, avatar, name, rating) => {
    setActiveTrainer({id: id, component: <TrainerListElement id={id} avatar={avatar} name={name} rating={rating} clear={clearTrainer}/>});
  }  

  const dogs = useOwnerDogs().map(e => {
    return <DogListElement 
      key={e.pk}
      id={e.pk} 
      avatar={e.avatar} 
      name={e.name}
      chooseDog={chooseDog}
      count={dogCount}
    />
  });

  const trainers = useTrainerList().map(e => {
    return <TrainerListElement
      key={e.pk}
      id={e.pk}
      avatar={e.avatar_url}
      name={e.username}
      rating={e.rating_trainer}
      chooseTrainer={chooseTrainer}
    />
  });

  useEffect(() => {
    setFormTime(minHour);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const [trainerAvailible, setTrainerAvailible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    const startDate = `${formData.date.format("YYYY-MM-DD")}T${time.add(1, 'minute').format("HH:mm:ss")}`;
    const endDate = `${formData.date.format("YYYY-MM-DD")}T${time.add(1, 'hour').format("HH:mm:ss")}`;
    const dogs = activeDog?.map(element => {
      return element.id;
    });
    const body = {
      date: startDate,
      date_end: endDate,
      trainer: activeTrainer.id,
      dogs: dogs,
    }
    
    instance.post(requests.trainerAvailible, {
      trainer_id: activeTrainer.id,
      date_start: startDate,
      date_end: endDate,
    }).then(response => {
      if (response.data.is_available === false) {
        console.log(response.data);
        setTrainerAvailible(false);
        // return;
      } else {
        instance.post(requests.orderAWalk, body)
        .then(response => {
          console.log(response.data);
        }).catch(error => {
          console.log(error.response.data);
        });
      }
    })
  }

  const displayDogs = activeDog ? 
    activeDog.map(e => {return e.component})
    : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='orderAWalk'>
        <h1>Order a walk</h1>
        <form>
          <Accordion>
            <AccordionSummary
              className='summary'
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className='displayDogs'>
                {displayDogs.length > 0 ? displayDogs : "Choose your dogs"}
              </div>
              <ClearIcon style={{alignSelf: 'center', marginLeft: 'auto', marginRight: '30px'}} onClick={clearDogs} className='clearIcon'/>
            </AccordionSummary>
            {dogs}
          </Accordion>
          <DatePicker 
            label="Date of the walk"
            className='datePicker'
            name='date'
            minDate={date}
            value={formData.date.format()}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField className='textInput' {...params} />
            )}
          />
          <div className='time'>
            <TimePicker
              label="Start of the walk"
              minutesStep={3600}
              minTime={minHour}
              maxTime={maxHour}
              value={time}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField id="start" {...params} />}
            />

            <TimePicker
              label="End of the walk"
              value={time.add(1, 'hour')}
              onChange={() => null}
              readOnly={true}
              renderInput={(params) => <TextField  {...params} />}
            />
          </div>
          {!trainerAvailible && <p>Trainer unavailible at the time</p>}
          <Accordion>
            <AccordionSummary
              className='summary'
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            {activeTrainer.component ? activeTrainer.component : "Choose one of our Trainers"}
            <ClearIcon style={{alignSelf: 'center', marginLeft: 'auto', marginRight: '30px'}} onClick={clearTrainer} className='clearIcon'/>
            </AccordionSummary>
            {trainers}
          </Accordion>

          <button className='button' onClick={handleSubmit}><EventAvailableIcon className='icon'/><p>Confirm your choices</p></button>
        </form>
      </div>
    </LocalizationProvider>

  )
}

const DogListElement = ({id, avatar, name, chooseDog, count}) => {

  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if(!selected && count < 3){
      setSelected(true);
      chooseDog(id, avatar, name);
    }
  }

  useEffect(() => {
    if(count === 0) {
      setSelected(false);
    }
  }, [count]);

  return (
    <div style={selected ? {backgroundColor: '#ffd87d',} : {backgroundColor: 'white'} } className='dogListElement' id={id} onClick={handleSelect}>
      <div>
        <Avatar src={avatar}/>
        <p>{name}</p>
        <div></div>
      </div>
    </div>
  );
}

const TrainerListElement = ({id, avatar, name, rating, chooseTrainer}) => {

  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if(!selected){
     setSelected(true);
     chooseTrainer(id, avatar, name, rating);
    }
  }

  let averageRating = 0;

  if (rating.length > 0) {
    rating.forEach(element => {
      averageRating += Number(element);
    });
    averageRating = averageRating / rating.length;
  } 

  return (
    <div style={selected ? {backgroundColor: '#ffd87d',} : {backgroundColor: 'white'} } className='trainerListElement' id={id} onClick={handleSelect}>
      <div>
        <Avatar src={avatar}/>
        <p>{name}</p>
        <p>{averageRating}</p>
      </div>
    </div>
  )
}

export default OrderAWalk