import React from 'react'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import './AddDogButton.css'

const AddDogButton = () => {
  return (
    <div className='addDogButton'>
      <AddCircleOutlinedIcon style={{
        fontSize: '48px',
        color: '#577590',
      }}/>
      <p>Add a new Dog</p>
      <div className='empty'></div>
    </div>
  )
}

export default AddDogButton