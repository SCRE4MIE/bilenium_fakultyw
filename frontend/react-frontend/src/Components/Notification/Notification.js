import React from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import './Notification.css';
import { useNavigate } from "react-router-dom";

const Notification = ({data, type}) => {

  const dayjs = require("dayjs");

  const startDate = dayjs(data.walk_start_date).format('DD-MM-YYYY');
  const startHour = dayjs(data.walk_start_date).subtract(1, "minute").format('HH:mm');

  let notification = "";
  let icon;

  const navigate = useNavigate();

  const goToWalks = () => {
    const userType = JSON.parse(sessionStorage.getItem('userDetails')).is_trainer;
    if(type !== 'Delete') {
      userType ? navigate('/incomingWalks') : navigate('/futureWalks');
    }
  }

  switch(data.action) {
    case "Create":
      notification = type === "client" ? "You've succesfully ordered a new walk." : "You have a new walk incoming."
      icon = type === "client" ? <CheckIcon className='icon' style={{color: 'green'}}/> : <AnnouncementOutlinedIcon className='icon' style={{color: 'green'}}/>
      break;
    case "Update":
      notification = "A walk has been modified."
      icon = <UpdateIcon className='icon' style={{color: 'blue'}}/>
      break;
    case "Delete":
      notification = "One of your walks has been called off."
      icon = <DeleteOutlineIcon className='icon' style={{color: 'red'}}/>
      break;
    default: 
      break;
  }

  return (
    <div className='notification' onClick={goToWalks}>
      <div className='description'>
        {icon}
        <p>{notification}</p>
      </div>
      <div className='time'>
        <p><span style={{fontWeight: '500'}}>Start date</span>: {startDate}</p>
        <p><span style={{fontWeight: '500'}}>Start hour</span>: {startHour}</p>
      </div>
    </div>
  )
}

export default Notification