import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HttpRequestsProvider } from "./contextAPI/HttpRequests";
import { UserProvider } from "./contextAPI/User";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <HttpRequestsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </HttpRequestsProvider>
  </BrowserRouter>


);
