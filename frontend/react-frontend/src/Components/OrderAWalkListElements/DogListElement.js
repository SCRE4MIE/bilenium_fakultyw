import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Pets, PetsOutlined } from '@mui/icons-material';

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
        {avatar && <Avatar src={avatar}/>}
        {!avatar && <PetsOutlined style={{fontSize:'30px', padding: '5px', backgroundColor: 'gray', color: 'lightgray', borderRadius: '50%'}}/>}
        <p>{name}</p>
        <div></div>
      </div>
    </div>
  );
}

export default DogListElement