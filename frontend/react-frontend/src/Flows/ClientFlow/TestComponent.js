import React from 'react';
import useCheckSlots from '../../CustomHooks/useCheckSlots';

const TestComponent = () => {

  const trainerWalks = useCheckSlots(2, '2022-05-13T15:00:00');

  console.log(trainerWalks);

  return (
    <div>TestComponent</div>
  )
}

export default TestComponent;