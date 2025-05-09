import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import "../Styles/Login.css"; // Include external style

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      await fetchUserProfile(token);

      navigate("/"); 
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User profile:", response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="login-bg">
      <Navbar />

      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>

          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group ">
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button onClick={handleLogin} className="login-btn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
