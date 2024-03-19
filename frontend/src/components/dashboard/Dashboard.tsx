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

const Dashboard = () => {
  const { loggedIn } = useContext(UserContext) as UserTypes;
  const [userData, setUserData] = useState<any>(null);

  const { baseURL } = useContext(HttpRequestsContext) as HttpRequestsTypes;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(baseURL + "/users/8");
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
          <SettlementList />
        </div>
      ) : (
        <p>Please log in to view the dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
