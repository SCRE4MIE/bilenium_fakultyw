import React, { useState, useEffect } from 'react';
import './WalksHistory.css';
import woman from '../../../Images/womanPlaceholder.jpg';
import WalksHistoryElement from '../../../Components/WalksHistory/WalksHistoryElement';

const WalksHistory = () => {
  const endedWalks = [
    {
      "id": 1,
      "dogName": "Milo",
      dogImage: woman,
      "trainerName" :"Andrewasasaasasaqaaaaaaaaaaaaaa",
      trainerImage : woman,
      "walk_date" : "2022-03-05",
      "walk_slot" : "10:45 - 11: 25",
    },
      {
      "id": 2,
      "dogName": "Pies2",
      dogImage: woman,
      "trainerName" :"Trener2",
      trainerImage : woman,
      "walk_date" : "-12-12",
      "walk_slot" : "10:45 - 11: 25",
    },
      {
      "id": 3,
      "dogName": "Pies1",
      dogImage: woman,
      "trainerName" :"Trener1",
      trainerImage : woman,
      "walk_date" : "12-12-12",
      "walk_slot" : "10:45 - 11: 25",
    },
    {
      "id": 4,
      "dogName": "Pies1",
      dogImage: woman,
      "trainerName" :"Trener1",
      trainerImage : woman,
      "walk_date" : "12-12-12",
      "walk_slot" : "10:45 - 11: 25",
    },
  ]
  // const [walks, setWalks] = useState();
//   useEffect(() => {
//   const fetchData = async () => {
//     const data = await fetch('url');
//     const json = await response.json();

//     setWalks(json);
//   }
//   fetchData().catch(console.error);;
// }, [])
  return (
    <div className='walksHistory'>
      <h1>Walk history</h1>
      <div className="walksList">
                {endedWalks.map((item) => (
                    <WalksHistoryElement key={item.id} {...item} />
                ))}
            </div>
    </div>
  )
}

export default WalksHistory;
