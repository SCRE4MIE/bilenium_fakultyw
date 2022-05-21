/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import PetsIcon from '@mui/icons-material/Pets';

const DogEditPicture = ({ src }) => {
  return (
    <>
      {
        src ?
        <img src={src} alt='dog profile picture' />
        : <PetsIcon style={{alignSelf: 'center', fontSize: '100px', color: 'lightgray'}}/>
      }

    </>
  )
}

export default DogEditPicture;