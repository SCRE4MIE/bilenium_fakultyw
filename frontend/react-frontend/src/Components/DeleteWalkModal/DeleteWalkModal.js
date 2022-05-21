import React from 'react';
import './DeleteWalkModal.css';
import requests from '../../requests';
import instance from "../../axios";

const DeleteWalkModal = ({toggleModal, walkData}) => {


  const toggle = () => {
    toggleModal();
  };

  const myDogsId = walkData.myDogs.map(e => e.pk);

  const remainingDogs = walkData.dogs.filter( function( el ) {
  return myDogsId.indexOf( el ) < 0;
  } );

  const deleteWalk = () => {
    if (remainingDogs.length === 0)
    {
      instance.delete(`${requests.updateWalk}${walkData.id}/`, {
      }).then(response => {console.log(response.data)});
    }
    else
    {
      instance.patch(`${requests.updateWalk}${walkData.id}/`, {
      date: walkData.startDate,
      date_end: walkData.endDate,
      trainer: walkData.trainerId,
      dogs: remainingDogs
    }).then(response => {console.log(response.data)});
    }

    window.location.reload();
  }

  return (
    <div className='cancelModal'>
      <div className='cancelAWalk'>
        <h2>Are you sure?</h2>
        <div className='buttons'>
          <button className='button' onClick={deleteWalk}>Yes</button>
          <button className='button' onClick={toggle}>No</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteWalkModal