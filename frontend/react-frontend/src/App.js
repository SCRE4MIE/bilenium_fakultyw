
import { createContext, useContext, useState } from 'react';
import ClientProfile from './Flows/ClientFlow/ClientFlow';
import LoggedInNavbar from './Components/LoggedInNavbar/LoggedInNavbar';
import LoginForm from './Flows/Login/LoginForm';
import LoggedInTrainerNavbar from './Components/LoggedInTrainerNavbar/LoggedInTrainerNavbar';
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './Flows/Registration/Register';
import instance from './axios';
import requests from './requests';


export const Context = createContext({})

function App() {

  const context = useContext(Context);
  
  const [userData, setUserData] = useState({token: sessionStorage.getItem('token'), userType: 'client'});

  let location = useLocation();

  const handleSignIn = (e) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      token: e,
      userType: 'client'
    }));
  }

  console.log(userData.token);

  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }

  const handleSignOut = () => {
    sessionStorage.removeItem('token');

    const csrftoken = getCookie('csrftoken');
    location.pathname = '/';

    var axios = require('axios');

    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/api/v1/auth/logout/',
      headers: { 
        'accept': 'application/json', 
        'X-CSRFToken': `${csrftoken}`, 
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setUserData({
        token: false,
        userType: ''
      });
    })
    .catch(function (error) {
      console.log(error);
    });

    // instance.post(requests.logout, {
    //     // 'X-CSRFToken': `X-CSRFToken: ${userData.token}`,
    //     // 'X-CSRFToken': `${csrftoken}`,
    //   body: {
    //     "X-CSRFToken": `${csrftoken}`
    //   }
    // }).then(response => {
    //   console.log(response)
    //   setUserData({
    //     token: false,
    //     userType: ''
    //   });
    // });
  }

  return (
    <Context.Provider value={userData}>
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
    </Context.Provider>
  );
}

export default App;
