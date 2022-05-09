/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

const DogEditPicture = ({ src }) => {
    console.log(src);
  return (
    <>
      {
        src ?
        <img src={src} alt='dog profile picture' />
        : <PersonIcon style={{alignSelf: 'center', fontSize: '100px', color: 'lightgray'}}/>
      }

    </>
  )
}

export default DogEditPicture;