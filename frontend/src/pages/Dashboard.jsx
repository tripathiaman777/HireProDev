import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import { Outlet, Route, Routes } from "react-router-dom";
// import { ProtectedRoute } from "../App.jsx";
import Profile from "./Profile.jsx";
function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Outlet/>
    </div>
  );
}

export default Dashboard;
