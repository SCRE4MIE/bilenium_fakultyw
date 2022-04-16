import React, { useState } from 'react'
import './LoggedInNavbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';

const LoggedInNavbar = ({ signOut, userType }) => {

  const [navHidden, setNavHidden] = useState(true)

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  }

  const toggleNav = () => {
    setNavHidden(prevState => !prevState);
  }

  const hideElements = {
    display: navHidden ? 'none' : 'flex',
    marginTop: '32px',
    marginBottom: '19px'
  }

  return (
    <div className={`loggedInNavbar ${!navHidden && 'menuShow'}`}>
      <div className='navButtons'>
        {navHidden && <ArrowBackIcon className='menuIcons'/>}
        <AccountCircleOutlinedIcon className='menuIcons'/>
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
        <a className='navLink'>Order a walk</a>
        <a className='navLink'>Trainers</a>
        <a className='navLink'>History</a>
        <a className='navLink'>Active walks</a>
        <a className='navLink'>Future walks</a>
      </div>
      {!navHidden && <button className='logoutButton' onClick={handleSignOut}>Logout</button>}
    </div>
  )
}

export default LoggedInNavbar