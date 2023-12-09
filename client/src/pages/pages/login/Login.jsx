import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <body className="logBody">
      <div className="login">
        <h1 className="titleLog" >Log in</h1>
        <div className="lContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
          {error && <span class='colorspan'>{error.message}</span>}
        </div>
          <br></br>
          <br></br>
          
        <span className="shr">
                <NavLink
              to="/register"
              style={{ color: "inherit", textDecoration: "none" }}
            >
             <span className="sh1">don't have account? Register now</span>
            </NavLink>
            <br />
            <br />
            <NavLink
              to="/forgot"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span className="sh2">Forgot password</span>
            </NavLink>
                </span>

      </div>
    </body>
  );
};

export default Login;