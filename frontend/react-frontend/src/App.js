
import { useState } from 'react';
import ClientProfile from './Flows/ClientFlow/ClientFlow';
import LoggedInNavbar from './Components/LoggedInNavbar/LoggedInNavbar';
import LoginForm from './Flows/Login/LoginForm';
import LoggedInTrainerNavbar from './Components/LoggedInTrainerNavbar/LoggedInTrainerNavbar';
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './Flows/Registration/Register';

function App() {

  const [userData, setUserData] = useState({token: false, userType: 'client'})

  let location = useLocation();

  const handleSignIn = () => {
    setUserData({
      token: true,
      userType: 'client'
    });
  }

  const handleSignOut = () => {
    location.pathname = '/';
    setUserData({
      token: false,
      userType: ''
    });
  }



  return (
    <div className="App">
      <Routes>
        {/* Register path */}
        {
          !userData.token
          && 
          <Route path='/register/*'
            element={<Register />}
          />
        }
        
        {/* Login path */}
        {
          !userData.token
          && 
          <Route path='/'
            element={<LoginForm signIn={handleSignIn}/>}
          />
        }

      </Routes>

      {userData.token && userData.userType === 'client' && <ClientProfile signOut={handleSignOut} /> }
      {userData.token && userData.userType === 'client' && <LoggedInNavbar userType={userData.userType} signOut={handleSignOut} />}
      {userData.token && userData.userType === 'trainer' && <p>Trainer profile</p>}
      {userData.token && userData.userType === 'trainer' && <LoggedInTrainerNavbar userType={userData.userType} signOut={handleSignOut} />}
    </div>
  );
}

export default App;
