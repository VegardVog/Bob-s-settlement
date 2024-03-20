import { useContext, useEffect, useState } from "react";
import SettlementItem from "./SettlementItem";
import { UserContext, UserTypes } from "../../../contextAPI/User";
import axios from "axios";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../../../contextAPI/HttpRequests";

const SettlementList = () => {
  const { loggedIn } = useContext(UserContext) as UserTypes;
  const [settlements, setSettlements] = useState([]);
  let userId: string | null = null;
  if (loggedIn) {
    userId = sessionStorage.getItem("id");
  }
  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          baseURL + `/users/${userId}/settlements`
        );
        setSettlements(response.data.data); // assumes fetch ok
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // checks if user is logged in before fetch
    if (loggedIn === "true") {
      fetchUserData();
    }
  }, [loggedIn]);

  return (
    <div className="settlements">
      {settlements.map((settlement, index) => {
        return <SettlementItem key={index} settlement={settlement} />;
      })}
    </div>
  );
};

export default SettlementList;
