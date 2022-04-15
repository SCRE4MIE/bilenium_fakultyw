
import { useState } from 'react';
import ClientProfile from './Flows/ClientProfile/ClientProfile';
import LoggedInNavbar from './Components/LoggedInNavbar/LoggedInNavbar';
import LoginForm from './Flows/Login/LoginForm';
import './Scss/Base.css';

function App() {

  const [token, setToken] = useState(null)

  const handleSignIn = () => {
    setToken(true);
  }

  const handleSignOut = () => {
    setToken(null);
  }

  return (
    <div className="App">
      {token ? <ClientProfile signOut={handleSignOut}/> : <LoginForm signIn={handleSignIn}/>}
      {token && <LoggedInNavbar signOut={handleSignOut}/>}
    </div>
  );
}

export default App;
