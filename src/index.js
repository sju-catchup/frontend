import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "index.scss";
import HumanAction from "pages/HumanAction/HumanAction";
import Detection from "pages/Detection/Detection";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<HumanAction />} />
      <Route path="/detection/:suspectId" element={<Detection />} />
    </Routes>
  </BrowserRouter>
);
