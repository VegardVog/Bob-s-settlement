import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles/settlements.css"

const AddUser = () => {


    const {loggedIn} = useContext(UserContext) as UserTypes;


  return (
    <div className='settlements-container'>
        <div className='settlements-title'>
            <h1 >Settlements Title</h1>
        </div>
    </div>
  )
}

export default AddUser;