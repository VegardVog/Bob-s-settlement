import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserTypes } from "../../contextAPI/User";
import "../../styles/settlements/singleSettlement.css";
import { Settlement } from "../../types/SettlementTypes";
import AddUser from "./AddUser";
import RemoveUser from "./RemoveUser";
import CloseSettlement from "./CloseSettlement";
import { User } from "../../types/UserTypes";
import axios from "axios";
import { HttpRequestsContext, HttpRequestsTypes } from "../../contextAPI/HttpRequests";

interface PropTypes {
    settlement: Settlement;
    settlements: Settlement[];
    setSettlements: Function;
}

const SingleSettlement = (props: PropTypes) => {
  const { settlement, setSettlements, settlements } = props ?? {};

  const { loggedIn } = useContext(UserContext) as UserTypes;

  const {baseURL} = useContext(HttpRequestsContext) as HttpRequestsTypes;

  const [users, setUsers] = useState<User[]>([])
  

  useEffect(() => {
      fetchUsers();
  }, []);




  const fetchUsers = () => {
      const fetchData = async () => {
          try {
              const response = await axios.get(baseURL + "/users");
              setUsers(response.data.data);

          } catch (error) {
              console.error(error);
          }
      }
      fetchData();
  }

  return (
    <div >
        <div >
            <h1>Title: {settlement.name}</h1>
        </div>
        <AddUser settlement={settlement} settlements={settlements} setSettlements={setSettlements} users={users} />
        <RemoveUser settlement={settlement} settlements={settlements} setSettlements={setSettlements} users={users}/>
        <CloseSettlement
        settlement={settlement}
        setSettlements={setSettlements}
        settlements={settlements}
      />
    </div>
  );
};

export default SingleSettlement;
