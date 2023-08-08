import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://app-7f71eebb-31d0-4c49-8cb0-d3bd849a9587.cleverapps.io";
axios.defaults.headers.common["Authorization"] = ``;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
