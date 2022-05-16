import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderWalksConfirm.css';


const OrderWalkConfirm = () => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/futureWalks');
  }

  return (
    <div className='oderWalkConfirm'>
      <div>
        <h2>You've succesfully ordered a walk!</h2>
        <button className='button' onClick={handleNavigate}>Proceed to Incoming Walks</button>
      </div>
    </div>
  )
}

export default OrderWalkConfirm;