import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar";
import HeadingMain from "../../components/heading";
import "../../pages/style/my-ticket.css";

function Dashboard() {
  return (
    <>
      <Header />
      <div className="child-container">
        <Sidebar />
        <div className="container">
          <HeadingMain />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
