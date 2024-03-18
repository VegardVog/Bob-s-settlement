import React, { useContext } from 'react'
import "../styles/menu.css";
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../contextAPI/User';

const Menu = () => {


    const {loggedIn} = useContext(UserContext) as UserTypes;


  return (
    <div className='menu-container'>
        <ul className='menu-ul'>
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <li className='menu-li' >Home</li>
            </Link>

            {!loggedIn} {
            <><Link to={"/login"} style={{ textDecoration: 'none' }}>
                <li className='menu-li'>Login</li>
            </Link><Link to={"/signup"} style={{ textDecoration: 'none' }}>
                <li className='menu-li'>Signup</li>
            </Link></>
            }


        </ul>
    </div>
  )
}

export default Menu