
import { useState } from 'react';
import LoggedInNavbar from './Components/LoggedInNavbar/LoggedInNavbar';
import LoginForm from './Flows/Login/LoginForm';
import LoggedInTrainerNavbar from './Components/LoggedInTrainerNavbar/LoggedInTrainerNavbar';
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Flows/Registration/Register';
import instance from './axios';
import requests from './requests';
import ClientFlow from './Flows/ClientFlow/ClientFlow';
import TrainerFlow from './Flows/TrainerFlow/TrainerFlow';


function App() {

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useState({})

  const [userData, setUserData] = useState({
    access: sessionStorage.getItem('access'), 
    refresh: sessionStorage.getItem('refresh'),
    userType: sessionStorage.getItem('userType'),
    userDetails: userDetails,
  });

  

  const handleSignIn = (e) => {
    navigate('/');
    instance.get(requests.userDetails)
    .then(response => {

      sessionStorage.setItem('userType', response.data.is_trainer ? 'trainer' : 'client');
      sessionStorage.setItem('userDetails', JSON.stringify(response.data));

      setUserData(prevUserData => ({
        ...prevUserData,
        access: e.access,
        refresh: e.refresh,
        userType: response.data.is_trainer ? 'trainer' : 'client',
        userDetails: response.data,
      }));

    }).catch(error => {
      console.log(error.details);
    })
  };


  const handleSignOut = () => {
    navigate('/');
    instance.defaults.headers['Authorization'] = sessionStorage.getItem('refresh');
    instance.post(requests.logout, {
    }).then(response => {
      sessionStorage.clear();
      instance.defaults.headers['Authorization'] = null;
      setUserData({
        access: null,
        refresh: null,
        userType: '',
      });
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <Routes>
        {/* Register path */}
        {
          !userData.access
          && 
          <Route path='/register/*'
            element={<Register />}
          />
        }
        
        {/* Login path */}
        {
          (!userData.access || userData.refresh === 'undefined')
          && 
          <Route path='/'
            element={<LoginForm signIn={handleSignIn}/>}
          />
        }
        {
          !userData.access
          && 
          <Route path='*'
            element={<LoginForm signIn={handleSignIn}/>}
          />
        }
      </Routes>
      {userData.access && userData.refresh !=='undefined' && userData.userType === 'client' && <ClientFlow /> }
      {userData.access && userData.refresh !=='undefined' && userData.userType === 'client' && <LoggedInNavbar userType={userData.userType} signOut={handleSignOut} />}
      {userData.access && userData.refresh !=='undefined' && userData.userType === 'trainer' && <TrainerFlow />}
      {userData.access && userData.refresh !=='undefined' && userData.userType === 'trainer' && <LoggedInTrainerNavbar userType={userData.userType} signOut={handleSignOut} />}
    </div>
  );
}

export default App;
