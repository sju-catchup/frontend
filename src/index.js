import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "index.scss";
// import Home from "pages/home/Home.js";
import HumanAction from "pages/HumanAction/HumanAction";
import New from "pages/HumanAction/New";
import Detection from "pages/Detection/Detection";
import Bound from "pages/Detection/Bound";
import LocalAlarm from "pages/HumanAction/Local";
// import reportWebVitals from "./reportWebVitals";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<HumanAction />} />
      <Route path="/a" element={<New />} />
      <Route path="/Bound" element={<Bound />} />
      <Route path="/detection/:id/:suspectId" element={<Detection />} />
      <Route path="/local" element={<LocalAlarm />} />
    </Routes>
  </BrowserRouter>
);
// https://eunhee-programming.tistory.com/164
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
