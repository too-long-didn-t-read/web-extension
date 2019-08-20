import "../css/popup.css";
import Router from "./popup/Router.jsx";
import React from "react";
import { render } from "react-dom";

render(
  <Router />,
  window.document.getElementById("app-container")
);
