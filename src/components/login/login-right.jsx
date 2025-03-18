import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService, PORTS } from "../../services/apiService"; // Import API service
import "../../style/login/login-right.css";

function LoginRight() {
  const [userName, setuserName] = useState("");
  const [password, setPasswordHash] = useState("");
  const [userNameError, setuserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState(""); // For API error messages
  const navigate = useNavigate();

  // userName validation function
  const validateuserName = (userName) => {
    return String(userName)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  // Input validation
  const validateInputs = () => {
    let isValid = true;

    if (!userName.trim()) {
      setuserNameError("userName is required");
      isValid = false;
    } else if (!validateuserName(userName)) {
      setuserNameError("Please enter a valid userName");
      isValid = false;
    } else {
      setuserNameError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        const response = await apiService.post(PORTS.user, "/api/user/login", {
          userName,           // Using correct variable names
          password,   // Using correct variable names
        });

        if (response?.status && response?.data?.token) {
          localStorage.setItem("authToken", response.data.token); // Store token in localStorage
          console.log("Login successful");
          navigate("/ticket");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setServerError("Invalid userName or password");
          } else {
            setServerError("Something went wrong. Please try again.");
          }
        } else {
          setServerError("Unable to connect to the server.");
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <div className="login-title">Login to access your account</div>
        </div>
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="input-field">
            <div className="input-wrapper">
              <input
                type="userName"
                className="input-text"
                placeholder="userName Address"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />
              {userNameError && <div className="error">{userNameError}</div>}
            </div>
          </div>
          <div className="input-field">
            <div className="input-wrapper">
              <input
                type="password"
                className="input-text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPasswordHash(e.target.value)}
              />
              {passwordError && <div className="error">{passwordError}</div>}
            </div>
          </div>
          {serverError && <div className="error">{serverError}</div>}
          <div className="options-container">
            <div className="CheckRem">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Password</label>
            </div>
          </div>
          <div className="login-btn-container">
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginRight;
