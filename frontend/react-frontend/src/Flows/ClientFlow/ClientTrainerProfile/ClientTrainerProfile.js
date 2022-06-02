import React, {useState, useEffect} from "react";
import './ClientTrainerProfile.css';
import StarIcon from '@mui/icons-material/Star';
import OpinionAboutTrainerElement from "../../../Components/OpinionAboutTrainer/OpinionAboutTrainerElement";
import requests from "../../../requests";
import instance from "../../../axios";
import ApiPicture from "../../../Components/ApiPicture";
import TrainerAvailibility from "../../../Components/TrainerAvailibility/TrainerAvailibility";


const ClientTrainerProfile = () => {
    const [availibility, setAvailibility] = useState({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      })
    const currentTrainerId = sessionStorage.getItem('currentTrainer');
    const [trainerDetails, setTrainerDetails] = useState({});
    const trainer = trainerDetails.trainerDetails;
    const rating_trainer_arr = trainer ? Object.values(trainer.rating_trainer).reverse() : null;
    useEffect(() => {
        instance.get(requests.trainerDetails + currentTrainerId.toString())
        .then(response => {

        setTrainerDetails(prevUserData => ({
            ...prevUserData,
            trainerDetails: response.data,
        }));

        }).catch(error => {
        console.log(error.details);
        })
    }, []);

    const phone_number = trainer ? [
    trainer.phone_number.slice(0, 3), " ",
    trainer.phone_number.slice(3, 6), " ",
    trainer.phone_number.slice(6, 9)]
    .join('') : null;

    const ratingSum = (ratingArr) => {
        let rating = 0;
        for (let index = 0; index < ratingArr.length; ++index) {
        rating = rating + ratingArr[index].value;
        }
        return Math.round((rating/ratingArr.length)*100)/100;
    };

    useEffect(() => {
        instance.get(`${requests.getTrainerWorkDaysByUser}${currentTrainerId}/`)
        .then(response => setAvailibility(response.data[0]));
      }, [currentTrainerId]);

    return (
        <div className='trainerProfile'>
            {trainer ? (
            <>
            <h1>{trainer.username}'s profile</h1>
            <div className='userInfo'>
                <div className='avatarSection'>
                <div className='profilePicture'>
                    <ApiPicture src={trainer.avatar_url} />
                </div>
                </div>
                <span>
                    {isNaN(ratingSum(trainer.rating_trainer)) ?
                    <h2 className="rating">No opinion yet</h2>
                    :
                    <h2 className="rating">
                    {ratingSum(trainer.rating_trainer)}/5
                    <StarIcon className='starIcon' style={{color: '#F9C74F'}}/>
                    </h2>}
                </span>
                <h2>
                {phone_number}
                </h2>
                <TrainerAvailibility availibility={availibility} username={trainer.username} />
            </div>
            <div className="opinionsHeader">
                <h3 className='opinionListTitle'>Opinions:</h3>
            </div>
            <div className="opinionList">
                {trainer.rating_trainer.length !== 0 ? (
                    <>
                    {rating_trainer_arr.map((item) => (
                        <OpinionAboutTrainerElement
                        key = {item.pk}
                        id = {item.pk}
                        username = {item.evaluator.username}
                        comment = {item.comment}
                        value = {item.value}
                        avatar = {item.evaluator.avatar_url}/>
                    ))}
                    </>
                ) : (
                    <div className="noOpinion">
                        <h3>{trainer.username} has no opinions yet</h3>
                    </div>
                )}
            </div>
            </>
            ):
                null
            }


        </div>
    )
}

export default ClientTrainerProfile;