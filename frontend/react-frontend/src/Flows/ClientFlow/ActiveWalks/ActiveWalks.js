import React from 'react';
import useClientActiveWalks from '../../../CustomHooks/useClientActiveWalks';
import './ActiveWalks.css';

const ActiveWalks = () => {

  const activeWalks = useClientActiveWalks();

  console.log(activeWalks);
  
  return (
    <div>Active Walks</div>
  )
}

export default ActiveWalks;