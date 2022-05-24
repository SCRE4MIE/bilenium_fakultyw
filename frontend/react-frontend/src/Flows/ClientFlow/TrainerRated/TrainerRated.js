import { useNavigate, useLocation } from 'react-router-dom';
import "./TrainerRated.css"

const TrainerRated = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const goBackToProfile = () => {
        navigate('/');
    }
    return (
        <div className='trainerRated'>
            <h1 className='trainerRated--header'>{state.trainerName} has been rated</h1>
            <div className='trainerRated--buttons'>
                <button className='button' onClick={goBackToProfile}>Go to your profile</button>
            </div>
        </div>
    )
}   
export default TrainerRated;