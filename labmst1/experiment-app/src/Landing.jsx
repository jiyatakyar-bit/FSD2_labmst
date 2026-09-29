import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const isAuthenticated =
    localStorage.getItem("isAuthenticated") === "true";

  const user = userData ? JSON.parse(userData) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  // If user is NOT logged in
  if (!isAuthenticated || !user) {
    return (
      <div
        style={{
          padding: "60px 20px",
          fontFamily: "sans-serif",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "2.8rem",
            color: "#212529",
            marginBottom: "10px",
          }}
        >
          Welcome to the Post Composer
        </h1>

        <p
          style={{
            color: "#6c757d",
            marginBottom: "40px",
            fontSize: "1.2rem",
          }}
        >
          A dedicated workspace for crafting and sharing your thoughts.
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 24px",
            fontSize: "1.1rem",
            cursor: "pointer",
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Log In to Get Started
        </button>
      </div>
    );
  }

  // If user IS logged in
  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "sans-serif",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          padding: "20px 25px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 5px 0" }}>
            Welcome, {user.username}
          </h2>

          <p style={{ margin: 0, color: "#6c757d" }}>
            Role: <strong>{user.role}</strong>
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          backgroundColor: "white",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ color: "#212529" }}>Post Composer</h1>

        <p style={{ color: "#6c757d" }}>
          Manage your posts according to your role and permissions.
        </p>

        {/* ADMIN */}
        {user.role === "Admin" && (
          <div>
            <h3 style={{ color: "#6c4ce6" }}>Admin Access</h3>

            <p>
              You can create, view, edit, and delete posts.
            </p>

            <button
              onClick={() => navigate("/create-post")}
              style={{
                padding: "12px 20px",
                backgroundColor: "#6c4ce6",
                color: "white",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Create Post
            </button>

            <button
              style={{
                padding: "12px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              Delete Post
            </button>
          </div>
        )}

        {/* EDITOR */}
        {user.role === "Editor" && (
          <div>
            <h3 style={{ color: "#0d6efd" }}>Editor Access</h3>

            <p>
              You can view and edit posts, but cannot create or delete them.
            </p>

            <button
              style={{
                padding: "12px 20px",
                backgroundColor: "#0d6efd",
                color: "white",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              View & Edit Posts
            </button>
          </div>
        )}

        {/* VIEWER */}
        {user.role === "Viewer" && (
          <div>
            <h3 style={{ color: "#198754" }}>Viewer Access</h3>

            <p>
              You have read-only access. You cannot create, edit, or delete
              posts.
            </p>

            <button
              style={{
                padding: "12px 20px",
                backgroundColor: "#198754",
                color: "white",
                border: "none",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            >
              View Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;