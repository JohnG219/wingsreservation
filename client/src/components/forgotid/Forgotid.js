import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Forgotid.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const Forgotid = () => {
  const location = useLocation();
  const [userid, setUserid] = useState(location.state.userid);
  const [username, setUsername] = useState(location.state.username);
  const [info, setInfo] = useState({});
  const [credentials, setCredentials] = useState({
    password: undefined,
    password2: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  //   Handle Change Function
  const handleChange = (e) => {
    e.preventDefault();
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //Handle Click Function
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (credentials.password == credentials.password2) {
        const res = await axios.put(`/users/update/${userid}`, credentials);
        setInfo({
          severity: "success",
          message: "Your password has been changed",
        });
        window.location.assign("/login");
      } else {
        setInfo({
          severity: "error",
          message: "password not matched",
        });
      }
    } catch (err) {
      setInfo({ severity: "error", message: "Error, please fill each field" });
    }
  };

  return (
    <body className="regBody4">
      <div className="login3">
        <div className="aContainer">
          <span className="sp5">Reset Password: {username}</span>

          {info.message && (
            <Alert
              severity={info.severity}
              onClose={() => setInfo({})}
              sx={{
                width: "100%",
                maxWidth: "400px",
                fontSize: "13px",
                position: "fixed",
                left: "33%",
                top: "27%",
              }}
            >
              {info.message}
            </Alert>
          )}

          <input
            type="password"
            className="lInput3"
            placeholder="New Password"
            id="password"
            onChange={handleChange}
          />
          <input
            type="password"
            className="lInput3"
            placeholder="Confirm Password"
            id="password2"
            onChange={handleChange}
          />
          <button disabled={loading} onClick={handleClick} className="Button12">
            Confirm
          </button>
        </div>
      </div>
    </body>
  );
};

export default Forgotid;
