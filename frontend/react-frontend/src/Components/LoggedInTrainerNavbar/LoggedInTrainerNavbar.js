import React, { useState } from 'react'
import './LoggedInTrainerNavbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

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
    <div style={{zIndex: '10'}} className={`loggedInTrainerNavbar ${!navHidden && 'menuShow'}`}>
      <div className='navButtons'>
        {navHidden && 
        <Tooltip title='Go back'>
          <ArrowBackIcon onClick={navigateBack} className='menuIcons'/>
        </Tooltip>
        }
        <Tooltip title='Go to your profile'>
          <AccountCircleOutlinedIcon onClick={navigateToProfile} className='menuIcons'/>
        </Tooltip>
        {navHidden ? 
          <Tooltip title='Expand Menu'>
            <MenuIcon 
              className='menuIcons'
              onClick={toggleNav}
            />
          </Tooltip>

            : 
          <Tooltip title='Close menu'>
            <CloseIcon 
              className='menuIcons' 
              onClick={toggleNav}
            />
          </Tooltip>
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