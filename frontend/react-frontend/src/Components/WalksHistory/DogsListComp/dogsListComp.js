import React, { useState, useEffect } from 'react';
import './dogsListComp.css';

const DogsListComp= (props) => {
    const {dogName, dogImage} = {...props}
    return(
        <div className='container'>
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
)};
export default DogsListComp;
