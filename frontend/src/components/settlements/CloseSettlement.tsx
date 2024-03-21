import { useContext, useEffect, useState } from "react";
import { UserContext, UserTypes } from "../../contextAPI/User";
import { Settlement } from "../../types/SettlementTypes";
import "../../styles/settlements/singleSettlement.css";
import axios from "axios";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../../contextAPI/HttpRequests";

const CloseSettlement = (props: {
  settlement: Settlement;
  setSettlements: Function;
  settlements: Settlement[];
}) => {
  const { loggedIn } = useContext(UserContext) as UserTypes;
  const [goingToSettle, setGoingToSettle] = useState(false);
  const userId = sessionStorage.getItem("id");

  const owner: any = props.settlement.owner;
  const isOwner = userId === owner.id.toString();
  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  useEffect(() => {
    const setSettled = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/settlements/${props.settlement.id}/settle`
        );
        props.setSettlements(
          props.settlements.map((s) =>
            s.id === props.settlement.id
              ? {
                  ...s,
                  settled: true,
                }
              : s
          )
        );

        console.log("Settlement settled successfully:", response.data);
      } catch (error) {
        console.error("Error settling settlement:", error);
      }
    };
    // checks if user is logged in before fetch
    if (loggedIn === "true" && goingToSettle) {
      setSettled();
    }
  }, [goingToSettle]);

  const closeSettlement = () => {
    if (
      window.confirm(
        `Are you sure you want to settle ${props.settlement.name}?`
      )
    ) {
      setGoingToSettle(true);
    }
  };

  return (
    <div className="closeSettlement-container">
      <button
        className="closeButton"
        onClick={closeSettlement}
        disabled={!isOwner}
        style={{ width: "100px" }}
      >
        Settle
      </button>
    </div>
  );
};

export default CloseSettlement;
