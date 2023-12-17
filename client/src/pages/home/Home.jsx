import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./home.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(
        new Date().toLocaleDateString("en-PH", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );

      setUpdateTrigger((prev) => !prev);
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Property type</h1>
        <PropertyList />
        <p id="date">{currentDate}</p>
        <h1 className="homeTitle1">Enjoy the most unforgettable experience</h1>
        <NavLink
          to="/about"
          className="custom-link"
          style={{
            color: "black",
            textDecoration: "underline",
            fontSize: "32px",
            marginBottom: "-88px",
          }}
        >
          {" "}
          ABOUT US
        </NavLink>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};
export default Home;
