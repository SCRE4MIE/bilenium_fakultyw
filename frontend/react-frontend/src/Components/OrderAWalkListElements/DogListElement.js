import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

const DogListElement = ({id, avatar, name, chooseDog, count, dogListLength, disable}) => {

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

  useEffect(() => {
    if(dogListLength === 1) {
      chooseDog(id, avatar, name);
    }
  }, []);

  const style = {
    backgroundColor: selected ? '#ffd87d' : 'white',
    border: disable && 'none',
  }

  return (
    <div style={style} className='dogListElement' id={id} onClick={handleSelect}>
      <div>
        <Avatar src={avatar}/>
        <p>{name}</p>
        <div></div>
      </div>
    </div>
  );
}

export default DogListElement