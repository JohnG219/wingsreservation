import React from "react";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ColorRing } from "react-loader-spinner";
import { Alert } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Register = () => {
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleUserame = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  const handleSurname = (e) => {
    setSurname(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setSubmitted(false);

    const isValidPassword = passwordValue.length >= 6;
    const passwordInput = e.target;
    setError(!isValidPassword);

    if (!isValidPassword) {
      passwordInput.setCustomValidity(
        "Password must be at least 6 characters long"
      );
    } else {
      passwordInput.setCustomValidity("");
    }
    passwordInput.reportValidity();
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setSubmitted(false);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };

  const handleBirthdate = (e) => {
    setBirthdate(e.target.value);
    setSubmitted(false);
  };

  const handleSex = (e) => {
    setSex(e.target.value);
    setSubmitted(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password.length < 6) {
      setError(true);
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dr4iesryu/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newUser = {
        username,
        surname,
        email,
        password,
        country,
        city,
        phone,
        birthdate,
        sex,
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      setSubmitted(true);
      setInfo({
        severity: "success",
        message: "Your Registration has been Successful!🎉",
      });
      window.location.assign("/login");
    } catch (err) {
      console.log(err);
      setInfo({ severity: "error", message: "Error, please fill each field" });
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <body className="regBody">
        <div className="registerr123">
          <NavLink to="/login" className="close-button1" onClick={handleCancel}>
            <CloseIcon />
          </NavLink>
          <h1 className="reTitle">Register</h1>
          <div className="left1">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>

          <label htmlFor="file">
            <div id="iconss">
              Profile picture:{" "}
              <DriveFolderUploadOutlinedIcon className="icon" />
            </div>
          </label>

          <div className="inputs">
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />

            {info.message && (
              <Alert
                severity={info.severity}
                onClose={() => setInfo({})}
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  fontSize: "14px",
                  position: "fixed",
                  left: "33%",
                  top: "35%",
                }}
              >
                {info.message}
              </Alert>
            )}

            <input
              onChange={handleUserame}
              className="rInput"
              type="text"
              id="username"
              placeholder="First Name"
            />
            <input
              onChange={handleSurname}
              className="rInput"
              type="text"
              id="surname"
              placeholder="Surname"
            />
            <input
              onChange={handleEmail}
              type="email"
              id="email"
              className="rInput"
              placeholder="Email"
            />
            <input
              onChange={handlePassword}
              className={`rInput ${error ? "error" : ""}`}
              type="password"
              id="password"
              placeholder="Password"
              style={{ color: "black" }}
            />
            <input
              onChange={handleCountry}
              className="rInput"
              type="text"
              id="country"
              placeholder="Country"
            />
            <input
              onChange={handleCity}
              className="rInput"
              type="text"
              id="city"
              placeholder="City"
            />
            <input
              onChange={handlePhone}
              className="rInput"
              type="text"
              id="phone"
              placeholder="+12 439 867 89"
            />
            <input
              onChange={handleBirthdate}
              className="rInput1"
              type="date"
              id="birthdate"
              placeholder="Birthdate"
              onFocus={(e) => (e.currentTarget.type = "date")}
              onBlur={(e) => (e.currentTarget.type = "text")}
            />

            <label>
              <input
                className="rInput2"
                type="radio"
                name="sex"
                value="Male"
                onChange={handleSex}
              />
              Male
            </label>
            <label>
              <input
                className="rInput2"
                type="radio"
                name="sex"
                value="Female"
                onChange={handleSex}
              />
              Female
            </label>
          </div>
          <br></br>
          <div class="footer">
            {loading ? (
              <ColorRing
                type="ThreeDots"
                color="#00BFFF"
                height={50}
                width={50}
                style={{ marginTop: "20px" }}
              />
            ) : (
              <button onClick={handleClick} type="submit" className="btn">
                Confirm
              </button>
            )}
          </div>
        </div>
      </body>
    </>
  );
};

export default Register;