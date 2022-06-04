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
      {walks?.length > 0 ? <h1>Walk history</h1> : <h1>You have no previous walks</h1>}
      <div className="walksList">
        {walks?walks.filter(walk => Date.parse(walk.date_end) <= Date.parse(newDate)).map((item) => (
                    <WalksHistoryElement key={item.id} {...item} />
                )):""}
            </div>
    </div>
  )
}

export default WalksHistory;
