import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./about.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 id="titlewel">Welcome to Our Hotel Johnreservation</h1>
      <div className="about-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          tincidunt, urna in fermentum condimentum, elit nisi laoreet elit, a
          ultrices mauris ex non risus. Nunc aliquam turpis eu tellus feugiat, a
          iaculis nisl sagittis.
        </p>
        <p>
          Integer dictum, neque ac interdum varius, sapien urna fringilla ipsum,
          eget interdum metus eros eu nisi. In non mauris et massa iaculis
          dictum. Sed vitae mi a turpis bibendum consequat eu a libero.
        </p>
        <p>
          Fusce malesuada nisl elit, et tristique sapien volutpat eu. Vivamus
          vitae nibh nisi. Cras congue sem vel velit efficitur, at bibendum odio
          suscipit. Nulla facilisi.
        </p>
      </div>
    </div>
  );
};

export default About;
