import React from 'react'
import './LoggedOutNavbar.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';

const LoggedOutNavbar = () => {


  return (
    <div className='loggedOutNavbar'>
      <Link to='/'><HomeOutlinedIcon className='menuIcons'/></Link>
    </div>
  )
}

export default LoggedOutNavbar

