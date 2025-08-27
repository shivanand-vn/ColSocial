import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  return (
    <nav style={navStyle}>
      <h1 style={{ color: "white",fontFamily:"Georgia" }}>ColSocial</h1>
      <div style={linkContainer}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/about" style={linkStyle}>About</Link>

        {!token ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/events" style={linkStyle}>Events</Link>
            <Link to="/forums" style={linkStyle}>Forums</Link>
            <Link to="/resources" style={linkStyle}>Resources</Link>
            <button onClick={handleLogout} style={logoutBtn}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  background: "#330404ff",
  padding: "3px 50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkContainer = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const logoutBtn = {
  background: "red",
  border: "none",
  padding: "6px 12px",
  color: "white",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Header;
