import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/agricare.jpeg";
// import PersonIcon from "@mui/icons-material/Person";
import { backendUrl } from "../data/data";

const AdminLogin = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f7fafc",
    darkBackground: "#2d3748",
  };

  const formContainerStyle = {
    background: "#ffffff",
    borderRadius: "0.375rem",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e2e8f0",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "400px", // Set your desired maximum width
    marginTop: "0",
    darkBackground: "#2d3748",
    darkBorder: "#4a5568",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    lineHeight: "1.25",
    letterSpacing: "-0.0125rem",
    color: "#1a202c",
    darkColor: "#ffffff",
    textAlign: "center",
  };

  const inputStyle = {
    background: "#edf2f7",
    border: "1px solid #e2e8f0",
    color: "#1a202c",
    darkBackground: "#4a5568",
    darkBorder: "#2d3748",
    darkColor: "#ffffff",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    padding: "0.625rem",
    width: "100%",
    marginBottom: "1rem",
  };

  const buttonStyle = {
    background: "#4CAF50", // Green color for the button
    color: "#ffffff",
    darkBackground: "#4299e1",
    darkHoverBackground: "#3182ce",
    darkFocusRing: "#90cdf4",
    borderRadius: "0.375rem",
    cursor: "pointer",
    // marginLeft: "33%",
    fontSize: "0.875rem",
    fontWeight: "500",
    letterSpacing: "0.05rem",
    lineHeight: "1.25",
    padding: "0.625rem 1.25rem",
    textAlign: "center",
    transition:
      "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    width: "auto",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(true); // Set it to true to display the form by default
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission based on the selected role
    const data = await fetch(`${backendUrl}admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (data.status == 201) {
      let token = await data.json();
      console.log(token);
      localStorage.setItem("adminToken", token.data);
      localStorage.setItem("role", "admin");
      navigate("/adminDash");
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleCrossIconClick = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <section style={{ ...containerStyle }}>
      <div style={{ ...formContainerStyle }}>
        <a
          href="#"
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#4CAF50",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <img
            style={{ width: "40px", height: "40px", marginRight: "8px" }}
            src={logo}
            alt="logo"
          />
          AgriCare
        </a>
        <div>
          <h1 style={{ ...headingStyle }}>Admin Login</h1>
          <form action="" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                style={{ ...inputStyle }}
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                style={{ ...inputStyle }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" style={{ ...buttonStyle }}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
