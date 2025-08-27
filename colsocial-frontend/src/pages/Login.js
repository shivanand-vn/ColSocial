import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.user.email);
      alert(`Welcome ${res.data.user.name}`);
      window.location.href = "/events";
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={formContainer}>
      <h2>🔑 Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
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
          Login
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

export default Login;
