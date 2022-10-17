import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "index.scss";
import Home from "pages/home/Home.js";
import Record from "pages/Record/Record";
import HumanAction from "pages/HumanAction/HumanAction";
import CCTV from "pages/Map/CCTV";
import CCTV2 from "pages/Map/CCTV_Alarm";
// import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <BrowserRouter basename="frontend">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/record" element={<Record />} />
      <Route path="/map/cctv" element={<CCTV />} />
      <Route path="/map/cctv2" element={<CCTV2 />} />
      <Route path="/human-action" element={<HumanAction />} />
    </Routes>
  </BrowserRouter>
);
// https://eunhee-programming.tistory.com/164
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
