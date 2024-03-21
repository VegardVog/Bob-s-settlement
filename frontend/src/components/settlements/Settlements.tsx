import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserTypes } from "../../contextAPI/User";
import "../../styles/settlements/settlements.css";
import AddUser from "./AddUser";
import RemoveUser from "./RemoveUser";
import ListOfSettlements from "./ListOfSettlements";
import CreateSettlement from "./CeateSettlement";
import { Settlement } from "../../types/SettlementTypes";

const Settlements = () => {
  const { loggedIn } = useContext(UserContext) as UserTypes;

  const [settlements, setSettlements] = useState<Settlement[]>([]);

    
  return (
    <div className="settlements-container">
      <div className="settlements-list-of-settlements">
        <ListOfSettlements
          settlements={settlements}
          setSettlements={setSettlements}
        />
      </div>
    </div>
  );
};

export default Settlements;
