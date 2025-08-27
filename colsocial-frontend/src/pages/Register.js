import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      alert(" Registration Successful!");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div style={formContainer}>
      <h2>📝 Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={btnStyle}>
          Register
        </button>
      </form>
    </div>
  );
}

const formContainer = {
  maxWidth: "400px",
  margin: "auto",
  textAlign: "center",
};
const formStyle = { display: "flex", flexDirection: "column", gap: "10px" };
const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};
const btnStyle = {
  background: "#0077b6",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Register;
