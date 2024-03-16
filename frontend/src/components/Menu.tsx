import React from 'react'
import "../styles/menu.css";
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className='menu-container'>
        <ul className='menu-ul'>
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <li className='menu-li' >Home</li>
            </Link>
            <Link to={"/login"} style={{ textDecoration: 'none' }}>
                <li className='menu-li'>Login</li>
            </Link>
            <Link to={"/signup"} style={{ textDecoration: 'none' }}>
                <li className='menu-li'>Signup</li>
            </Link>

        </ul>
    </div>
  )
}

export default Menu