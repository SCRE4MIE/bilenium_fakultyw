import React, { useState } from 'react'
import './LoggedInNavbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

const LoggedInNavbar = ({ signOut, userType }) => {

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
    <div className={`loggedInNavbar ${!navHidden && 'menuShow'}`}>
      <div className='navButtons'>
        {navHidden && <ArrowBackIcon className='menuIcons' onClick={navigateBack}/>}
        <AccountCircleOutlinedIcon className='menuIcons' onClick={navigateToProfile}/>
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
        <Link onClick={toggleNav} to='/orderAWalk' className='navLink'>Order a walk</Link>
        <Link onClick={toggleNav} to='/trainerList' className='navLink'>Trainers</Link>
        <Link onClick={toggleNav} to='/walksHistory' className='navLink'>History</Link>
        <Link onClick={toggleNav} to='/activeWalks' className='navLink'>Active walks</Link>
        <Link onClick={toggleNav} to='/futureWalks' className='navLink'>Incoming walks</Link>
      </div>
      {!navHidden && <button className='logoutButton' onClick={handleSignOut}>Logout</button>}
    </div>
  )
}

export default LoggedInNavbar