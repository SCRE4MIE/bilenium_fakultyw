import React, {useState, useEffect} from "react";
import woman from "../../../Images/womanPlaceholder.jpg"
import './ClientTrainerProfile.css';
import StarIcon from '@mui/icons-material/Star';
import OpinionAboutTrainerElement from "../../../Components/OpinionAboutTrainer/OpinionAboutTrainerElement";
import requests from "../../../requests";
import instance from "../../../axios";
import ApiPicture from "../../../Components/ApiPicture";


const ClientTrainerProfile = () => {
    const currentTrainerId = sessionStorage.getItem('currentTrainer');
    const [trainerDetails, setTrainerDetails] = useState({});
    const trainer = trainerDetails.trainerDetails;
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


    const opinion = [
        {
        name: "Jessica",
        imageSrc: woman,
        rating: 4,
        id: 321,
        opinion: "Dla mnie super!!!",
        },
        {
            name: "John",
            imageSrc: woman,
            rating: 3,
            id: 432,
            opinion: "Vivamus eleifend est pharetra metus fringilla, in vehicula est sagittis. Pellentesque sem mauris metus. ",
        }
    ]

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
                    <h2 className="rating">
                    4/5
                    {/* {ratingSum(trainer.rating_trainer)}/5 */}
                    </h2>
                    <StarIcon className='starIcon'/>
                </span>
                <h2>
                {phone_number}
                </h2>
            </div>
            <div className="opinionList">
                <h3 className='opinionListTitle'>Opinions</h3>
                <OpinionAboutTrainerElement
                imageSrc={opinion[0].imageSrc}
                name={opinion[0].name}
                rating = {opinion[0].rating}
                opinion={opinion[0].opinion}/>

                <OpinionAboutTrainerElement
                imageSrc={opinion[1].imageSrc}
                name={opinion[1].name}
                rating = {opinion[1].rating}
                opinion={opinion[1].opinion}/>
            </div>
            </>
            ):
                null
            }


        </div>
    )
}

export default ClientTrainerProfile;