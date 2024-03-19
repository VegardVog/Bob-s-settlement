import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles/settlements/settlements.css";
import AddUser from './AddUser';
import RemoveUser from './RemoveUser';
import ListOfSettlements from './ListOfSettlements';
import CreateSettlement from './CeateSettlement';

const Settlements = () => {


    const {loggedIn} = useContext(UserContext) as UserTypes;


  return (
    <div className='settlements-container'>
      <div>
        <CreateSettlement />
      </div>
      <div className='settlements-list-of-settlements'>
        <ListOfSettlements />
      </div>
       
    </div>
  )
}

export default Settlements;