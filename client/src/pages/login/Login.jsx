import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { Alert } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    error: {
      username: false,
      password: false,
    },
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
      error: {
        ...prev.error,
        [id]: value.trim() === "",
      },
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!credentials.username || !credentials.password) {
      setCredentials((prev) => ({
        ...prev,
        error: {
          username: !credentials.username,
          password: !credentials.password,
        },
      }));
      return;
    }

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleRegisterNowClick = () => {
    dispatch({ type: "RESET_ERROR" });
  };
  const handleForgotPasswordClick = () => {
    dispatch({ type: "RESET_ERROR" });
  };

  return (
    <body className="logBody">
      <div className="login">
        <h1 className="titleLog">Login</h1>
        <div className="lContainer">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className={`lInput ${credentials.error.username ? "error" : ""}`}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className={`lInput ${credentials.error.password ? "error" : ""}`}
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
        </div>
        {error && <span class="colorspan">{error.message}</span>}
        <br></br>
        <br></br>
        <span className="shr123">
          <NavLink
            to="/register"
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={handleRegisterNowClick}
          >
            <span className="sh1">don't have account? Register now</span>
          </NavLink>
          <br />
          <br />
          <NavLink
            to="/forgot"
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={handleForgotPasswordClick}
          >
            <span className="sh2">Forgot password</span>
          </NavLink>
        </span>
      </div>
    </body>
  );
};

export default Login;
