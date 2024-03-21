import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, UserTypes } from '../../contextAPI/User';
import "../../styles//profile/history.css";
import { HttpRequestsContext, HttpRequestsTypes } from '../../contextAPI/HttpRequests';
import axios from 'axios';
import { Settlement } from '../../types/SettlementTypes';

const History = () => {


    const {loggedIn, id} = useContext(UserContext) as UserTypes;
    const {baseURL} = useContext(HttpRequestsContext) as HttpRequestsTypes;

    const navigate = useNavigate();

    const [history, setHistory] = useState<Settlement[]>();
    const [historyFiltered, setHistoryFiltered] = useState<Settlement[]>();

    const [settlements, setSettlements] = useState<Settlement[]>([]);


    useEffect(() => {
        setHistoryFiltered(history?.filter((settlement) => settlement.settled === true));
    }, [history]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseURL + `/users/${id}/settlements/history`)
                setHistory(response.data);
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    


    if(!historyFiltered) {
        return <div>Loading...</div>
    }

  return (
    <div className='profile-container'>
        <div className='settlements-title'>
            <h1>History</h1>
        </div>

        {historyFiltered.map(
          (settlement: Settlement, index: React.Key | null | undefined) => {
            return (
              <ul key={index} className="settlement-list-item history-item">
                <h2> Settlement Title:  {settlement.name}</h2>
                <h3> Settlement Owner: {settlement.owner.username} </h3>
                <h4 >Participant usernames: </h4>
                {settlement.participants.map((participant, index2) => {
                    return (
                        <>
                        <div key={index2}>
     
                            <li > {participant.username}</li>
                        </div>

                        </> 
                    )
                })}
              </ul>
            );
            })}
    </div>
  )
}

export default History;