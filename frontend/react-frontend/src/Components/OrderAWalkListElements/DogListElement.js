import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

const DogListElement = ({id, avatar, name, chooseDog, count}) => {

  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    if(!selected && count < 3){
      setSelected(true);
      chooseDog(id, avatar, name);
    }
  }

  useEffect(() => {
    if(count === 0) {
      setSelected(false);
    }
  }, [count]);

  return (
    <div style={selected ? {backgroundColor: '#ffd87d',} : {backgroundColor: 'white'} } className='dogListElement' id={id} onClick={handleSelect}>
      <div>
        <Avatar src={avatar}/>
        <p>{name}</p>
        <div></div>
      </div>
    </div>
  );
}

export default DogListElement