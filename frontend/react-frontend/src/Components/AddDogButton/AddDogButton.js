import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import './AddDogButton.css';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AddDogButton = () => {

  const navigate = useNavigate();

  const openAddNewDog = () => {
    navigate('/AddNewDog');
  };

  return (
    <div className='addDogButton' onClick={openAddNewDog}>
      <Tooltip title='Add a new dog'>    
      <AddCircleOutlinedIcon className='icon' style={{
        fontSize: '48px',
        color: '#577590',
      }}/>
      </Tooltip>
      <p>Add a new Dog</p>
      <div className='empty'></div>
    </div>
  )
}

export default AddDogButton