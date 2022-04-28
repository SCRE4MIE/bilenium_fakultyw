import React from "react";
import './TrainerList.css';
import TrainerListElement from "./TrainerListElement";
import woman from '../../Images/womanPlaceholder.jpg';

const TrainerList = () => {
    const trainers = [
    {
      "id": 1,
      "name": "Sophia",
      imageSrc: woman,
      rating: 4,
    },
      {
      "id": 2,
      "name": "John",
      imageSrc: woman,
      rating: 3,
    },
      {
      "id": 3,
      "name": "Marta",
      imageSrc: woman,
      rating: 5,
    },
    {
      "id": 4,
      "name": "Michael",
      imageSrc: woman,
      rating: 2,
    },
  ]
  console.log(trainers[0]);
    return (
        <>
            <h1>Trainer list</h1>
            <div className="trainerList">
                {trainers.map((item) => (
                    <TrainerListElement
                    key = {item.id}
                    name = {item.name}
                    rating = {item.rating}
                    imageSrc = {item.imageSrc}/>
                ))}
            </div>
        </>
    )
}

export default TrainerList;