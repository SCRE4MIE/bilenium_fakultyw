import React from 'react';
import './TrainerActiveWalks.css';
import * as dayjs from 'dayjs'
import TrainerWalkDogs from '../../../Components/TrainerWalkDogs/TrainerWalkDogs';
import useTrainerActiveWalks from '../../../CustomHooks/useTrainerActiveWalks';

const TrainerActiveWalks = () => {

  const activeWalks = useTrainerActiveWalks(JSON.parse(sessionStorage.getItem('userDetails')).pk);
  
  const displayActiveWalk = activeWalks[0];

  const dogComponents = displayActiveWalk?.dogs.map(id => <TrainerWalkDogs key = {id} id = {id}/>);
  

  return (
    <>
    {displayActiveWalk ? <WalkActive displayActiveWalk = {displayActiveWalk} dogComponents = {dogComponents}/> : <NoActive/>}
   </>
  ) 
}

const WalkActive = ({displayActiveWalk, dogComponents}) => {
  return (
  <div className='trainerActiveWalks'>
    <h1 className='activeWalkHeader'>Active walk</h1>
    <p className='walkDate'>Walk date: {dayjs(displayActiveWalk?.date).format("YYYY-MM-DD")}</p>
    <p className='walkHours'>Walk hours: {dayjs(displayActiveWalk?.date).format("HH:mm")} - {dayjs(displayActiveWalk?.date_end).format("HH:mm")}</p>

    <h2 className='activeWalkDogs'>Dogs: </h2>
    <div style={{
      display:'flex', 
      flexWrap: 'wrap', 
      paddingLeft: '40px', 
      paddingRight: '40px',
      justifyContent: 'center'
    }}>
      {dogComponents}
    </div>
  </div>
  )
}

const NoActive = () => {
  return (
  <div className='trainerActiveWalks'>
    <h1 className='activeWalkHeader'>Active walk</h1>
    <h1 className='activeWalkHeader'>You have no active walks</h1>
  </div>
  )
}

export default TrainerActiveWalks;