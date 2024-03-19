import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles/settlements/singleSettlement.css"



interface Settlement {
    id: number;
    name: string;
    settled: boolean;
    owner: object;
    participants: [object];
}


interface PropTypes {
    settlement: Settlement;
}

const SingleSettlement = (props: PropTypes) => {

    const {settlement} = props ?? {};

    const {loggedIn} = useContext(UserContext) as UserTypes;


  return (
    <div >
        <div >
            <h1 >Settlements SingleSettlement</h1>
        </div>
        {settlement.name}
    </div>
  )
}

export default SingleSettlement;