import React, { useState, useEffect } from 'react';
import './WalksHistory.css';
import WalksHistoryElement from '../../../Components/WalksHistory/WalksHistoryElement';
import instance from '../../../axios';
import requests from '../../../requests';
import { Backdrop, CircularProgress } from '@mui/material';

const WalksHistory = () => {
  const [walks, setWalks] = useState();
  let newDate = new Date();

  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  }

  useEffect(() => {
    instance.get(requests.userWalksHistory)
      .then(response => {
        handleOpen();
        setWalks(response.data);
      }).catch(error => {
        console.log(error.details);
    })
    }, []);

  return (
    <div className='walksHistory'>
      {!walks && 
        <Backdrop sx={{ color: '#fff', zIndex: '2'}} open={open}>
          <CircularProgress color='inherit'/>
        </Backdrop>
      }
      {walks?.length > 0 ? <h1>Walk history</h1> : !open && <h1>You have no previous walks</h1>}
      <div className="walksList">
        {walks?walks.filter(walk => Date.parse(walk.date_end) <= Date.parse(newDate)).map((item) => (
                    <WalksHistoryElement key={item.id} {...item} />
                )):""}
            </div>
    </div>
  )
}

export default WalksHistory;
