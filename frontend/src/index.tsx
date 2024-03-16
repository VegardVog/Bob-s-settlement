import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HttpRequestsProvider } from "./contextAPI/HttpRequests";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <HttpRequestsProvider>
      <App />
    </HttpRequestsProvider>

  </BrowserRouter>


);
