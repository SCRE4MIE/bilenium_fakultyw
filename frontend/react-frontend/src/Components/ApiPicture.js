/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

const ApiPicture = ({ src }) => {
  return (
    <>
      {
        src ?
        <img src={`http://127.0.0.1:8000${src}`} alt='user profile picture' />
        : <PersonIcon style={{alignSelf: 'center', fontSize: '100px', color: 'lightgray', width: '100%'}}/>
      }

    </>
  )
}

export default ApiPicture;