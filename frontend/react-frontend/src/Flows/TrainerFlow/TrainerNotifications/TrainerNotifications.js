import React, { useEffect, useState } from 'react';
import instance from '../../../axios';
import requests from '../../../requests';
import './TrainerNotifications.css';
import Notification from '../../../Components/Notification/Notification';

const TrainerNotifications = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    instance.get(requests.getNotifications)
    .then(response => setNotifications(response.data));
  }, [])
  
  const notificationsElements = notifications.map(e => <Notification key = {e.pk} id = {e.pk} data = {e.walk_notification} type="trainer"/>);


  return (
    <div className='TrainerNotifications'>
      <div>
        <h2>Notifications</h2>
        {notificationsElements.length > 0 ? notificationsElements : <p>There are no new notifications</p> }
      </div>

    </div>
  )
}

export default TrainerNotifications;