import React, { useState, useEffect } from 'react';
import './WalksHistory.css';
import WalksHistoryElement from '../../../Components/WalksHistory/WalksHistoryElement';
import instance from '../../../axios';
import requests from '../../../requests';

const WalksHistory = () => {
  const [walks, setWalks] = useState();
  let newDate = new Date();

  useEffect(() => {
    instance.get(requests.userWalksHistory)
      .then(response => {
        setWalks(response.data);
      }).catch(error => {
        console.log(error.details);
    })
    }, []);
  return (
    <div className='walksHistory'>
      <h1>Walk history</h1>
      <div className="walksList">
        {walks?walks.filter(walk => Date.parse(walk.date_end) <= Date.parse(newDate)).map((item) => (
                    <WalksHistoryElement key={item.id} {...item} />
                )):""}
            </div>
    </div>
  )
}

export default WalksHistory;
