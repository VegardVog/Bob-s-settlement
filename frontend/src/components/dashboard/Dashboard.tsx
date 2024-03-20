// Dashboard.tsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext, UserTypes } from "../../contextAPI/User";
import "../../styles/dashboard.css";
import {
  HttpRequestsContext,
  HttpRequestsTypes,
} from "../../contextAPI/HttpRequests";
import SettlementList from "./Settlements/SettlementList";
import DistributionList from "./Distributions/DistributionList";

const Dashboard = () => {
  const { loggedIn } = useContext(UserContext) as UserTypes;
  const [userData, setUserData] = useState<any>(null);
  let userId: string | null = null;
  if (loggedIn) {
    userId = sessionStorage.getItem("id");
  }

  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/${userId}`);
        setUserData(response.data.data); // assumes fetch ok
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
    <div className="dashboard">
      <div className="dashboard-title">
        <h2>Dashboard</h2>
      </div>
      {loggedIn === "true" ? (
        <div className="dashboard-container">
          <div className="user-info">
            <p>Welcome, {userData?.username}</p>
            <p>{userData?.email}</p>
          </div>
          <div className="dashboard-layout">
            <SettlementList />
            <DistributionList />
          </div>
        </div>
      ) : (
        <p>Please log in to view the dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
