import React from 'react'
import './DogListElement.css'
import dogPicture from '../../Images/dogPlaceholder.jpg'
import cashtan from '../../Images/Cashtan.png'
import EditIcon from '../EditIcon'

const DogListElement = ({ imageSrc, name, id }) => {
  return (
    <div className='dogListElement'>
      <div className='dogPictureContainer'>
        <img src={imageSrc} alt='' />
      </div>
      <p className='dogName'>{name}</p>
      <EditIcon />
    </div>
  )
}

export default DogListElement