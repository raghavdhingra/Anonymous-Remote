import React from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "./auth/auth";
import Alerts from "./alerts/alerts";
import Remote from "./remote/remote";

const Base = () => {
  return (
    <>
      <Alerts />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Remote />} />
        <Route path="*" element={<h1>Page not Found</h1>} />
      </Routes>
    </>
  );
};

export default Base;
