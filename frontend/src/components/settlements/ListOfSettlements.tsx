import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserTypes } from "../../contextAPI/User";
import "../../styles/settlements/listOfSettlements.css";
import axios from "axios";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../../contextAPI/HttpRequests";
import SingleSettlement from "./SingleSettlement";
import { Settlement } from "../../types/SettlementTypes";
import CreateSettlement from "./CeateSettlement";

const ListOfSettlements = (props: {
  settlements: Settlement[];
  setSettlements: Function;
}) => {
  const { loggedIn } = useContext(UserContext) as UserTypes;

  const { id } = useContext(UserContext) as UserTypes;

  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  const { settlements, setSettlements } = props ?? {};
  const [filteredSettlements, setFilteredSettlements] = useState<Settlement[]>(
    []
  );

  useEffect(() => {
    getSettlementsFromUser();
  }, []);

  useEffect(() => {
    const filtered = settlements.filter(
      (settlement) => settlement.settled === false
    );
    setFilteredSettlements(filtered);
  }, [settlements]);

  const getSettlementsFromUser = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL + `/users/${id}/settlements`);
        setSettlements(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  if (!settlements) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="settlements-title">
        <h1>Settlements ListOfSettlements</h1>
      </div>
      <CreateSettlement
        settlements={settlements}
        setSettlements={setSettlements}
      />
      <div>
        {filteredSettlements.map(
          (settlement: Settlement, index: React.Key | null | undefined) => {
            return (
              <li key={index} className="settlement-list-item">
                <SingleSettlement
                  settlement={settlement}
                  setSettlements={setSettlements}
                  settlements={settlements}
                />
              </li>
            );
          }
        )}
      </div>
    </>
  );
};

export default ListOfSettlements;
