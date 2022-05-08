import { getThemeProps } from '@mui/system';
import React from 'react';
import './WalksHistoryElement.css';

const WalksHistoryElement= (props) => {
    const {dogName, dogImage, trainerName, trainerImage, walk_date, walk_slot } = {...props}
    return(
    <div className='walksHistoryElement' onClick={()=>{alert("test")}}>
       <div className='dogContainer'>
        <div className='dog'><h2>Dog:</h2></div>
        <div className='dogNameImage'>
            <div className='dogImage'>
                <img src={dogImage} alt='' />
            </div>
            <div className='dogName'>
                <h2>{dogName}</h2>
            </div>
        </div>
      </div>
      <hr className='line'></hr>
      <div className='dogContainer'>
        <div className='dog'><h2>Trainer:</h2></div>
        <div className='dogNameImage'>
            <div className='dogImage'>
                <img src={trainerImage} alt='' />
            </div>
            <div className='dogName'>
                <h2>{trainerName}</h2>
            </div>
        </div>
      </div>
      <div className='walkSlotContainer'>
        <h2>{walk_date}</h2>
        <h2>{walk_slot}</h2>
      </div>
    </div>);
};
export default WalksHistoryElement;