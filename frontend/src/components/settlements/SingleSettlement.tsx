import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserTypes } from "../../contextAPI/User";
import "../../styles/settlements/singleSettlement.css";
import { Settlement } from "../../types/SettlementTypes";
import AddUser from "./AddUser";
import RemoveUser from "./RemoveUser";
import CloseSettlement from "./CloseSettlement";

interface PropTypes {
  settlement: Settlement;
  settlements: Settlement[];
  setSettlements: Function;
}

const SingleSettlement = (props: PropTypes) => {
  const { settlement, setSettlements, settlements } = props ?? {};

  const { loggedIn } = useContext(UserContext) as UserTypes;

  return (
    <div className="singleItem">
      <div>
        <h1>{settlement.name}</h1>
      </div>
      <div>
        <AddUser
          settlement={settlement}
          settlements={settlements}
          setSettlements={setSettlements}
        />
        <RemoveUser settlement={settlement} />
      </div>
      <CloseSettlement
        settlement={settlement}
        setSettlements={setSettlements}
        settlements={settlements}
      />
    </div>
  );
};

export default SingleSettlement;
