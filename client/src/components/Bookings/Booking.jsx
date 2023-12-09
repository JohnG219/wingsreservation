import "./booking.css";
import { format } from "date-fns";
import Logo from "./images/logo.png";
import React, { useContext, useRef } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import List from "../../pages/list/List";

function Booking({ setOpen }) {
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          //navigate(`/book/${selectedRooms}`)
          navigate(`/hotels/room/book/${selectedRooms}`, {
            state: { selectedRooms, hotelId },
          });
          return res.data;
        })
      );
      console.log(pr);
      setOpen(false);

      // navigate("/")
    } catch (err) {}
  };

  const { dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  let componentRef = useRef();

  const Print = (e) => {
    e.preventDefault();
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(selectedRooms)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const location = useLocation();
  //const [dates, setDates] = useState(location.state.dates);

  // const { data2 } = useFetch(`/hotels/${hotelId}`);

  // const [data, setData] = useState(location.state.data);
  //const { dates } = useContext(SearchContext);

  //const { data } = useFetch(`/book/${hotelId},${selectedRooms}`);
  //const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates, options } = useContext(SearchContext);
  // Fetch price data from the backend using location.state.hotelId
  const [pr, setpr] = useState("");
  const { data } = useFetch(`/hotels/room/${location.state.hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState(
    location.state.selectedRooms
  );
  const { selectedRoomNumbers, totalPrice } = location.state || {};
  const { hotelId } = location.state;
  const [error, setError] = useState(false);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  var days = dayDifference(dates[0].endDate, dates[0].startDate);
  if (days == 0) {
    days = days + 1;
  }

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const navigate = useNavigate();
  const filteredData = data.filter((item) =>
    selectedRooms.includes(item.title)
  );
  console.log(filteredData);
  console.log("selectedRooms:", selectedRooms);
  console.log("data:", data);

  const [bids, setBids] = useState({
    bid: undefined,
    sdate: undefined,
    edate: undefined,
    un: undefined,
    ue: undefined,
    de: undefined,
    rn: undefined,
    hn: undefined,
  });

  const handleChange = (e) => {
    setBids((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleclick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("/customers/create", bids);
      alert("Your Booking Credentials has been sent🎉");
    } catch (err) {
      console.log(err);
      alert("Error, please fill each field");
    }
  };

  const handleClick1 = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  const handleclick1 = () => {
    navigate("/profile");
  };

  return (
    <div className="mainContainer">
      <div className="contentArea1">
        <div className="right1">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>Reservation Complete</h1>
          <div className="details" id="printablediv">
            <hr className="hr2" />
            <div className="detailItem">
              {" "}
              <p id="aly">|Room Details Price |</p>
              {data.map((item) => (
                <div className="detailItem" key={item.id}>
                  <p id="code">id: {item._id}</p>
                  <span className="itemKey">Room: {item.title}</span>
                  <span className="rPrice">
                    ${days * item.price * options.room} for {days} days
                  </span>
                  <p id="code">maxpeople: {item.maxPeople}</p>
                  <p id="code">desc: {item.desc}</p>
                </div>
              ))}
            </div>
            <p id="change">Change room and cancellation are Available</p>
            ---------------------------------------------------------
            <br></br>
            <br></br>
            <p id="bookedtitle"> ✔️BOOKED </p>
            {data.map((item) => (
              <div className="detailItem" key={item.id}>
                <p id="perss">{item.dest}</p>
                <p id="pers">{item.htl}</p>
                <p id="pers">{item.loc}</p>
              </div>
            ))}
            {selectedRoomNumbers &&
              selectedRoomNumbers.map((room, index) => (
                <div className="detailItem" key={index}>
                  <span className="itemKey">
                    Room:
                    <p id="allss">
                      {room.title}, {room.number}
                    </p>
                  </span>
                </div>
              ))}
            <span>
              <span className="itemKey5">Booked ID:</span>
              <span value={selectedRooms}>
                {" "}
                <span onClick={handleCopyClick}>
                  {selectedRooms}{" "}
                  {isCopied ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faCopy} />
                  )}
                </span>
              </span>
            </span>
            <div className="detailItem">
              <span className="itemKey">From Date :</span>
              <span className="itemValue">{`  ${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )}`}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">To Date :</span>
              <span className="itemValue">{`  ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Total Price:</span>
              <span className="itemValue">
                <p id="pricess">${totalPrice}</p>
              </span>
            </div>
            ---------------------------------------------------------
            <p id="aly">| Personal Details |</p>
            <div className="detailItem">
              <span className="itemKey">Name:</span>
              <span className="itemValue">
                {user.username}&nbsp;{user.surname}
              </span>
            </div>
            <div className="detailItem">
              <span className="itemKey">Email:</span>
              <span className="itemValue">{user.email}</span>
            </div>
            <div className="detailItem">
              <button id="printbtn" onClick={Print}>
                Print
              </button>
            </div>
          </div>
          <div class="textali">
            <hr className="hr2" />
            <span className="itemKey1">
              Please fill out the following form in as much detail as possible
              to avoid cancellation.
            </span>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <form class="rInput1">
              <div class="form-container">
                <div class="form-row">
                  <label htmlFor="bid">
                    <span className="itemKey">Booking ID:</span>
                    <input
                      className="tp1"
                      onChange={handleChange}
                      type="text"
                      id="bid"
                      required
                      placeholder="ex.6956264ca16077a6evsb6ce72"
                    />
                  </label>
                </div>

                <div class="form-row">
                  <label htmlFor="sdate">
                    <span className="itemKey">From Date:</span>
                    <input
                      className="tp1"
                      onChange={handleChange}
                      type="date"
                      id="sdate"
                      required
                    />
                  </label>
                </div>

                <div class="form-row">
                  <label htmlFor="edate">
                    <span className="itemKey">To Date:</span>
                    <input
                      className="tp1"
                      onChange={handleChange}
                      type="date"
                      id="edate"
                      required
                    />
                  </label>
                </div>

                <div class="form-row">
                  <label htmlFor="ue">
                    <span className="itemKey">Email:</span>
                    <input
                      className="tp1"
                      onChange={handleChange}
                      type="text"
                      id="ue"
                      required
                      placeholder="ex@custr.com"
                    />
                  </label>
                </div>

                <div class="form-row">
                  <label htmlFor="de">
                    <span className="itemKey">Destination:</span>
                    <input
                      className="tp1"
                      onChange={handleChange}
                      type="text"
                      id="de"
                      required
                      placeholder="Norway"
                    />
                  </label>
                </div>

                <div class="form-row">
                  <label htmlFor="rn">
                    <span className="itemKey">Room#, Title:</span>
                    <input
                      className="tp1"
                      onChange={handleChange}
                      type="text"
                      id="rn"
                      required
                      placeholder="203, M.Bed"
                    />
                  </label>
                </div>

                <div class="form-row">
                  <label htmlFor="hn">
                    <span className="itemKey">Hotel Name</span>
                    <input
                      className="tp1"
                      onChange={handleChange}
                      type="text"
                      id="hn"
                      required
                      placeholder="Hotel Norper"
                    />
                  </label>
                </div>

                <div class="form-row">
                  <button id="bayag" onClick={handleclick}>
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>

        <div className="left">
          <img className="logol" src={Logo} alt="" />
          <h1>Johnreservation</h1>
          <button id="btnnn1">
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              HOME
            </NavLink>
          </button>

          <button id="btnnn1" onClick={handleClick1}>
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;
