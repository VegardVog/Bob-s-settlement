import React, { useContext, useEffect } from 'react'
import "../styles/menu.css";
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../contextAPI/User';

const Menu = () => {


    const {loggedIn, setLoggedIn} = useContext(UserContext) as UserTypes;


    const handleLogout = () => {
        setLoggedIn("false");
    };

  return (
    <div className='menu-container'>
        <ul className='menu-ul'>
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <li className='menu-li' >Home</li>
            </Link>

            {loggedIn !== "true" ?
            <><Link to={"/login"} style={{ textDecoration: 'none' }}>
                <li className='menu-li'>Login</li>
            </Link><Link to={"/signup"} style={{ textDecoration: 'none' }}>
                <li className='menu-li'>Signup</li>
            </Link></>
             : <> 
             <Link to={"/profile"} style={{ textDecoration: 'none' }}>
                <li className='menu-li'>Profile</li>
             </Link>
             
             <Link to={"/settlements"} style={{ textDecoration: 'none' }}>
                <li className='menu-li'>Settlements</li>
             </Link>
             <Link to={"/"} style={{ textDecoration: 'none' }}>
                <li className='menu-li' onClick={handleLogout}>Logout</li>
             </Link>
             </>}


        </ul>
    </div>
  )
}

export default Menu