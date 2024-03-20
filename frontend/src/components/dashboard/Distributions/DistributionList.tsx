import { useContext, useEffect, useState } from "react";
import { UserContext, UserTypes } from "../../../contextAPI/User";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../../../contextAPI/HttpRequests";
import axios from "axios";
import DistributionItem from "./DistributionItem";

const DistributionList = () => {
  const { loggedIn } = useContext(UserContext) as UserTypes;
  const [distributions, setDistributions] = useState([]);
  let userId: string | null = null;
  if (loggedIn) {
    userId = sessionStorage.getItem("id");
  }
  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          baseURL + `/users/${userId}/distributions`
        );
        console.log(response.data.data);
        setDistributions(response.data.data); // assumes fetch ok
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
    <div className="distributions">
      <div className="distributionItem">
        <span>Item name</span>
        <span>Full price</span>
        <span>Percent</span>
        <span>Settlement</span>
      </div>
      {distributions.map((distribution, index) => {
        return <DistributionItem key={index} distribution={distribution} />;
      })}
    </div>
  );
};

export default DistributionList;
