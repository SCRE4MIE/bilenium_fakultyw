import React, { useState } from 'react'
import './LoggedInTrainerNavbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

const LoggedInTrainerNavbar = ({ signOut }) => {

  const navigate = useNavigate();

  const [navHidden, setNavHidden] = useState(true)

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  }

  const toggleNav = () => {
    setNavHidden(prevState => !prevState);
  }

  const navigateBack = () => {
    navigate(-1);
  }

  const navigateToProfile = () => {
    !navHidden && toggleNav();
    navigate('/');
  }

  const hideElements = {
    display: navHidden ? 'none' : 'flex',
    marginBottom: '19px'
  }

  return (
    <div className={`loggedInTrainerNavbar ${!navHidden && 'menuShow'}`}>
      <div className='navButtons'>
        {navHidden && <ArrowBackIcon onClick={navigateBack} className='menuIcons'/>}
        <AccountCircleOutlinedIcon onClick={navigateToProfile} className='menuIcons'/>
        {navHidden ? 
          <MenuIcon 
            className='menuIcons'
            onClick={toggleNav}
          /> 
            : 
          <CloseIcon 
            className='menuIcons' 
            onClick={toggleNav}
          />
          }
      </div>
      <div className='navLinks' style={hideElements}>
        <Link onClick={toggleNav} to='/incomingWalks' className='navLink'>Incoming walks</Link>
        <Link onClick={toggleNav}to='/activeWalks' className='navLink'>Active walks</Link>
        <Link onClick={toggleNav} to='/walksHistory' className='navLink'>History</Link>
      </div>
      {!navHidden && <button className='logoutButton' onClick={handleSignOut}>Logout</button>}
    </div>
  )
}

export default LoggedInTrainerNavbar