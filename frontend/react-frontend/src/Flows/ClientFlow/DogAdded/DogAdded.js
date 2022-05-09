import { Link, useNavigate } from 'react-router-dom';
import "./DogAdded.css"

const DogAdded = () => {
    const navigate = useNavigate();

    const goBackToProfile = () => {
        navigate('/');
    }
    return (
        <div className='addedDog'>
            <h1 className='addedDog--header'>Your new dog has been added!</h1>
            <div className='addedDog--buttons'>
                <button className='button' onClick={goBackToProfile}>Go to your profile</button>
            </div>
        </div>
    )
}   
export default DogAdded