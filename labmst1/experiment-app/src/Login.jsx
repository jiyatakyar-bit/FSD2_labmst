import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // User credentials and their roles
  // Yahan tum apne actual usernames/passwords define kar sakti ho.
  const users = [
    {
      username: "admin_user",
      password: "admin123",
      role: "Admin",
    },
    {
      username: "editor_user",
      password: "edit123",
      role: "Editor",
    },
    {
      username: "viewer_user",
      password: "view123",
      role: "Viewer",
    },
  ];

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      // Store complete user information
      localStorage.setItem("user", JSON.stringify(user));

      // Authentication flag
      localStorage.setItem("isAuthenticated", "true");

      // Go to home page
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fb",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "350px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />

          {error && (
            <p
              style={{
                color: "red",
                margin: "0",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#6c4ce6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;