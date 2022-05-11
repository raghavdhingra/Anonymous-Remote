import React from "react";
import Container from "../container/container";
import Navbar from "../navbar/navbar";

import "./dashboard.scss";

const Dashboard = ({ children }) => {
  return (
    <Container className="dashboard__container-full-height">
      <Navbar />
      {children}
    </Container>
  );
};

export default Dashboard;
