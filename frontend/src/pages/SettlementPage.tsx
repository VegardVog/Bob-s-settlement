import { useContext, useEffect, useState } from "react";
import "../styles/settlementPage.css";
import { UserContext, UserTypes } from "../contextAPI/User";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../contextAPI/HttpRequests";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Settlement } from "../types/SettlementTypes";
import { Distribution } from "../types/DistributionTypes";
import { User } from "../types/UserTypes";
import DistributionItem from "../components/SingleSettlementComponent/DistributionItem";
import "../styles/singleSettlementComponent.css";

const SettlementPage = () => {
  const { loggedIn, id } = useContext(UserContext) as UserTypes;
  const settlementId = useParams<{ id: string }>();
  const [settlement, setSettlement] = useState<Settlement | null>(null);
  const [groupedDistributions, setGroupedDistributions] = useState<
    Map<number, Distribution[]>
  >(new Map());

  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  useEffect(() => {
    const fetchSettlementData = async () => {
      try {
        const response = await axios.get(
          baseURL + `/settlements/${settlementId.id}`
        );

        setSettlement(response.data.data); // assumes fetch ok
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // checks if user is logged in before fetch
    if (loggedIn === "true") {
      fetchSettlementData();
    }
  }, [loggedIn, settlementId, baseURL]);

  useEffect(() => {
    const fetchDistributionsData = async () => {
      try {
        const response = await axios.get(
          baseURL + `/settlements/${settlementId.id}/items/distributions`
        );
        const distributions: Distribution[] = response.data.data;

        // Group distributions by item
        const grouped = new Map<number, Distribution[]>();
        distributions.forEach((distribution) => {
          const itemId = distribution.item.id;
          if (grouped.has(itemId)) {
            grouped.get(itemId)?.push(distribution);
          } else {
            grouped.set(itemId, [distribution]);
          }
        });
        setGroupedDistributions(grouped);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // checks if user is logged in before fetch
    if (loggedIn === "true") {
      fetchDistributionsData();
    }
  }, [loggedIn, settlementId, baseURL]);

  if (settlement === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settlement">
      <div className="settlementInfo">
        <h2>Name: {settlement.name}</h2>
        <h2>Owner: {(settlement.owner as User).username}</h2>
      </div>
      <div className="distributionsAndItems">
        {Array.from(groupedDistributions).map(([itemId, distributions]) => (
          <div key={itemId}>
            <h3>{distributions[0].item.name}</h3>
            <ul className="AsList">
              {distributions.map((distribution) => (
                <DistributionItem
                  key={distribution.id}
                  distribution={distribution}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettlementPage;
