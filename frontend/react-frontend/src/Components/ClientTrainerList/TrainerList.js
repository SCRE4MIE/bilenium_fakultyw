import React from "react";
import './TrainerList.css';
import TrainerListElement from "./TrainerListElement";

const TrainerList = (props) => {
    return (
        <>
            <h1>Trainer list</h1>
            {props.trainers ? (
            <div className="trainerList">
                {props.trainers.map((item) => (
                    <TrainerListElement
                    key = {item.pk}
                    id = {item.pk}
                    name = {item.username}
                    rating_trainer = {item.rating_trainer}
                    imageSrc = {item.avatar_url}/>
                ))}
            </div>
            ) :
            <h2>List is empty</h2>}
        </>
    )
}

export default TrainerList;