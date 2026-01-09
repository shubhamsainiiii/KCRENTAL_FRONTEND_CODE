// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");

    // agar token nahi hai to home page par bhej do
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
