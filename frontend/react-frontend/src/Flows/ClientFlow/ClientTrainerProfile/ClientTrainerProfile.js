import React from "react";
import woman from "../../../Images/womanPlaceholder.jpg"
import './ClientTrainerProfile.css';
import StarIcon from '@mui/icons-material/Star';
import OpinionAboutTrainerElement from "../../../Components/OpinionAboutTrainer/OpinionAboutTrainerElement";

const ClientTrainerProfile = () => {
    const trainer = {
      id: 1,
      username: "Sophia",
      phone_number: "999652123",
      imageSrc: woman,
      rating: 4,
    }

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

    const phone_number = [
    trainer.phone_number.slice(0, 3), " ",
    trainer.phone_number.slice(3, 6), " ",
    trainer.phone_number.slice(6, 9)]
    .join('');

    return (
        <div className='trainerProfile'>
            <h1>{trainer.username} profile</h1>
            <div className='userInfo'>
                <div className='avatarSection'>
                <div className='profilePicture'>
                    <img src={woman} alt='trainer profile picture' />
                </div>
                </div>
                <span>
                    <h2 className="rating">
                    {trainer.rating}/5
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


        </div>
    )
}

export default ClientTrainerProfile;