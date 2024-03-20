import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles/settlements/singleSettlement.css"
import {Settlement} from "../../types/SettlementTypes";
import AddUser from './AddUser';
import RemoveUser from './RemoveUser';



interface PropTypes {
    settlement: Settlement;
}

const SingleSettlement = (props: PropTypes) => {

    const {settlement} = props ?? {};

    const {loggedIn} = useContext(UserContext) as UserTypes;


  return (
    <div >
        <div >
            <h1>Title: {settlement.name}</h1>
        </div>
        <AddUser settlement={settlement}/>
        <RemoveUser settlement={settlement}/>
    </div>
  )
}

export default SingleSettlement;