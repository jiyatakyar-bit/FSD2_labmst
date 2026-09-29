import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  const userData = localStorage.getItem("user");

  // Not logged in
  if (!isAuthenticated || !userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  // If specific roles are required, check the user's role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontFamily: "Arial",
        }}
      >
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;