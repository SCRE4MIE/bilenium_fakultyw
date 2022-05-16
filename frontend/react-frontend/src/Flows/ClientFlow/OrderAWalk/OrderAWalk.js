import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './OrderAWalk.css';
import useOwnerDogs from '../../../CustomHooks/useOwnerDogs';
import useTrainerList from '../../../CustomHooks/useTrainerList';
import { Accordion, AccordionSummary, Avatar, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ClearIcon from '@mui/icons-material/Clear';
import instance from '../../../axios';
import requests from '../../../requests';
import useCheckSlots from '../../../CustomHooks/useCheckSlots';
import { useNavigate } from 'react-router-dom';
import DogListElement from '../../../Components/OrderAWalkListElements/DogListElement';
import TrainerListElement from '../../../Components/OrderAWalkListElements/TrainerListElement';


const OrderAWalk = () => {

  const navigate = useNavigate();

  const dayjs = require('dayjs');

  dayjs().format();
  let date = dayjs().minute(0).second(0);

  const [formData, setFormData] = useState({
    date: date.add(1, 'day'),
    dogs: [],
    trainer: '',
  });

  const [errors, setErrors] = useState({
    dogError: "",
    arrayError: "",
    fullSlotError: "",
    trainerError: "",
  })

  let minHour = date.hour(8).minute(0).second(0);
  let maxHour = date.hour(17).minute(0).second(0);
  if (formData.date.day() === 0 || formData.date.day() === 6) {
    minHour = date.hour(9).minute(0).second(0);
    maxHour = date.hour(15).minute(0).second(0);
  }

  const [time, setFormTime] = useState(minHour);

  const handleDateChange = (e) => {
    setErrors(prevErrors => ({...prevErrors, dogError: ""}));
    setFormData(prevData => {
      return {
        ...prevData,
        date: e,
      }
    });
  }

  const handleTimeChange = (e) => {
    setErrors(prevErrors => ({...prevErrors, dogError: ""}));
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
      setDogCount(prevDogCount => (prevDogCount + 1));
      setErrors(prevErrors => ({...prevErrors, fullSlotError: ""}));
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
    setActiveTrainer({id: id, component: <TrainerListElement id={id} avatar={avatar} name={name} rating={rating} disable={true}/>});
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
      avatar={`${instance.defaults.baseURL.substring(0, instance.defaults.baseURL.length - 4)}${e.avatar_url?.substring(1)}`}
      name={e.username}
      rating={e.rating_trainer}
      chooseTrainer={chooseTrainer}
      current={activeTrainer.id}
      startDate={formData.date}
    />
  });

  const trainerSlots =  useCheckSlots(
    activeTrainer?.id,
    `${formData.date.format("YYYY-MM-DD")}T${time.add(1, 'minute').format("HH:mm:ss")}` 
  );


  useEffect(() => {
    setFormTime(minHour);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    if(activeTrainer) {
      setErrors(prevErrors => ({...prevErrors, trainerError: ""}));
    }
    if(activeDog) {
      setErrors(prevErrors => ({...prevErrors, arrayError: ""}))
    }
  }, [activeDog, activeTrainer]);

  const handleSubmit = (e) => {
    e.preventDefault()
    const startDate = `${formData.date.format("YYYY-MM-DD")}T${time.add(1, 'minute').format("HH:mm:ss")}`;
    const endDate = `${formData.date.format("YYYY-MM-DD")}T${time.add(1, 'hour').format("HH:mm:ss")}`;
    const slots = trainerSlots[0];
    const dogs = activeDog?.map(element => {
      return element.id;
    });
    const body = {
      date: startDate,
      date_end: endDate,
      trainer: activeTrainer.id,
      dogs: dogs,
    }

    if (dogs.length === 0){ setErrors(prevErrors => ({...prevErrors, arrayError: "No dogs selected."}))};
    if (!activeTrainer.id){ setErrors(prevErrors => ({...prevErrors, trainerError: "Trainer not selected."}))};
    if (slots) {
      if(slots.dogs.length - 3 === 0) {
        setErrors(prevErrors => ({...prevErrors, fullSlotError: "Unable to assign more dogs to this slot"}));
      } else if(dogs.length > 3 - slots.dogs.length) {
        setErrors(prevErrors => ({
          ...prevErrors, 
          arrayError: `Maximum number of dogs per slot exceeded, you can choose only ${3-slots.dogs.length} 
          ${3-slots.dogs.length === 1 ? "dog." : "dogs."}`
        })); 
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          fullSlotError: "",
          arrayError: "",
        }))
      }
    }

    if(errors.arrayError === "" && errors.fullSlotError === "" && errors.trainerError === ""){
      if(slots && errors.arrayError === "" && errors.fullSlotError === "" && errors.trainerError === ""){
        const patchedDogs = slots.dogs.concat(dogs);
        body.dogs = patchedDogs;
        
        instance.patch(`${requests.updateWalk}${slots.id}/`, body)
        .then(response => {
          navigate("/orderWalkConfirm");
        }).catch(error => {
          console.log(error.response.data);
        });
      }
      
      else {
        instance.post(requests.orderAWalk, body)
        .then(response => {
          navigate("/orderWalkConfirm");
        }).catch(error => {
          if(error.response.data.non_field_errors[0][0] ==='T'){
            setErrors(prevErrors => ({...prevErrors, trainerError: "Selected trainer is unavailible during that day of the week"}));
          } else if(body.dogs.length > 0) {
            setErrors(prevErrors => ({...prevErrors, dogError: "One of the dogs you chose is already assigned to a walk during the selected time and date"}));
          }
        })
      }
    }
  }

  const displayDogs = activeDog ? 
    activeDog.map(e => {return e.component})
    : null;


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='orderAWalk'>
        <h1>Order a walk</h1>
        <form>
          {errors.arrayError && <Alert variant="filled" severity="warning">{errors.arrayError}</Alert>}
          {errors.dogError && <Alert variant="filled" severity="warning">{errors.dogError}</Alert>}
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
          {errors.trainerError && <Alert variant="filled" severity="warning">{errors.trainerError}</Alert>}
          {errors.fullSlotError && <Alert variant="filled" severity="warning">{errors.fullSlotError}</Alert>}
          <button className='button' onClick={handleSubmit}><EventAvailableIcon className='icon'/><p>Confirm your choices</p></button>
        </form>
      </div>
    </LocalizationProvider>

  )
}

export default OrderAWalk;