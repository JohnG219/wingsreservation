import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import Logo from "./images/logo.png";
import { faFolderarrowup, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Tabs } from "antd";

const Profile = () => {
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  const handleclick = () => {
    navigate("/profile");
  };

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  //Handle Change Function

  //Handle Click Function

  return (
    <div className="mainContainer">
      <div className="contentArea">
        <div className="right">
          <h1>Profile</h1>
          <img
            required
            className="img"
            src={user.img ? user.img : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt=""
          />
          <div className="details">
            <h1 className="itemTitle"></h1>
            <div className="detailItem">
              <span className="itemKey">Name:</span>
              <span className="itemValue">
                {user.username}
                &nbsp;
                {user.surname}
              </span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Sex:</span>
              <span className="itemValue">{user.sex}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Birthdate:</span>
              <span className="itemValue">{user.birthdate}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Email:</span>
              <span className="itemValue">{user.email}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Phone:</span>
              <span className="itemValue">{user.phone}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Country:</span>
              <span className="itemValue">{user.country}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">City:</span>
              <span className="itemValue">{user.city}</span>
            </div>
          </div>
        </div>

        <div className="left">
          <img className="logol" src={Logo} alt="" />
          <h1>Johnreservation Account</h1>
          <button id="btnnn1">
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              HOME
            </NavLink>
          </button>

          <button id="btnnn1">
            <NavLink
              to="/edituser"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              UPDATE
            </NavLink>
          </button>

          <button id="btnnn1">
            <NavLink
              to="/contact"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              CONTACT
            </NavLink>
          </button>

          <button id="btnnn1" onClick={handleClick}>
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
