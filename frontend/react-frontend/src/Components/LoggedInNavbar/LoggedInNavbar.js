import React, { useState } from 'react'
import '../../Scss/Base.css'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';

const LoggedInNavbar = ({ signOut }) => {

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
        <a className='navLink'>Incoming Walks</a>
        <a className='navLink'>Active Walks</a>
        <a className='navLink'>History</a>
      </div>
      {!navHidden && <button className='logoutButton' onClick={handleSignOut}>Logout</button>}
    </div>
  )
}

export default LoggedInNavbar