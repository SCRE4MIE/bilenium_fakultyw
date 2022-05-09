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

  const [activeDog, setActiveDog] = useState({});

  const chooseDog = (id, avatar, name, chooseDog) => {
    setActiveDog({id: id, component: <DogListElement id={id} avatar={avatar} name={name}/>});
  };

  const chooseTrainer = (id, avatar, name, rating) => {
    setActiveTrainer({id: id, component: <TrainerListElement id={id} avatar={avatar} name={name} rating={rating} />});
  }

  
  const dogs = useOwnerDogs().map(e => {
    return <DogListElement 
      key={e.pk}
      id={e.pk} 
      avatar={e.avatar} 
      name={e.name}
      chooseDog={chooseDog}
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

  const handleSubmit = () => {
    
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='orderAWalk'>
        <h1>Order a walk</h1>
        DODAJ W RIKŁEŚCIE MINUTĘ DO CZASU ROZPOCZĘCIA
        <form>
          <Accordion>
            <AccordionSummary
              className='summary'
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            {activeDog.component ? activeDog.component : "Choose one of your dogs"}
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
          <Accordion>
            <AccordionSummary
              className='summary'
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            {activeTrainer.component ? activeTrainer.component : "Choose one of our Trainers"}
            </AccordionSummary>
            {trainers}
          </Accordion>

          <button className='button' onClick={handleSubmit}><EventAvailableIcon className='icon'/><p>Confirm your choices</p></button>
        </form>
      </div>
    </LocalizationProvider>

  )
}

const DogListElement = ({id, avatar, name, chooseDog}) => {
  return (
    <div className='listElement' id={id} onClick={() => chooseDog(id, avatar, name)}>
      <div>
        <Avatar src={avatar}/>
        <p>{name}</p>
        <div></div>
      </div>
    </div>
  );
}

const TrainerListElement = ({id, avatar, name, rating, chooseTrainer}) => {

  let averageRating = 0;

  if (rating.length > 0) {
    rating.forEach(element => {
      averageRating += Number(element);
    });
    averageRating = averageRating / rating.length;
  }

  return (
    <div className='listElement' id={id} onClick={() => chooseTrainer(id, avatar, name, rating)}>
      <div>
        <Avatar src={avatar}/>
        <p>{name}</p>
        <p>{averageRating}</p>
      </div>
    </div>
  )
}

export default OrderAWalk