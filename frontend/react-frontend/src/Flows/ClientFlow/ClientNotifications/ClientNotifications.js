import React, { useEffect, useState } from 'react';
import instance from '../../../axios';
import requests from '../../../requests';
import './ClientNotifications.css';
import Notification from '../../../Components/Notification/Notification';

const ClientNotifications = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    instance.get(requests.getNotifications)
    .then(response => setNotifications(response.data));
  }, [])
  
  const notificationsElements = notifications.map(e => <Notification key = {e.pk} id = {e.pk} data = {e.walk_notification} type="client"/>);

  return (
    <div className='ClientNotifications'>
      <div>
        <h2>Notifications</h2>
        {notificationsElements}
      </div>

    </div>
  )
}

export default ClientNotifications;