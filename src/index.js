import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "index.scss";
import Home from "pages/home/Home.js";
import HumanAction from "pages/HumanAction/HumanAction";
import LocalAlarm from "pages/HumanAction/Local";
import CCTV from "pages/Map/CCTV";
import CCTV3 from "pages/Map/Numbering";
import CCTV4 from "pages/Map/Html";
import LocalMap from "pages/Map/Local";
// import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <BrowserRouter basename="frontend">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map/cctv" element={<CCTV />} />
      <Route path="/map/cctv3" element={<CCTV3 />} />
      <Route path="/map/cctv4" element={<CCTV4 />} />
      <Route path="/human-action" element={<HumanAction />} />
      <Route path="/local" element={<LocalAlarm />} />
      <Route path="/localMap" element={<LocalMap />} />
    </Routes>
  </BrowserRouter>
);
// https://eunhee-programming.tistory.com/164
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
