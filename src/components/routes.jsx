import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./auth/auth";
import Controller from "./controller/controller.jsx";

import "./index.css";

const PageRoute = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Controller />} />
    </Routes>
  );
};

export default PageRoute;
