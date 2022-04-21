import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import './AddDogButton.css';
import { Tooltip } from '@mui/material';


const AddDogButton = () => {
  return (
    <div className='addDogButton'>
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