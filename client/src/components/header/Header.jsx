import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Header = ({ type }) => {
  const [error, setError] = useState(false);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate(); 
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

   const validDestinations = [
     "singapore",
     "australia",
     "philippines",
     "norway",
     "switzerland",
   ];

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {

    if (!destination.trim()) {
      setError(true);
      Swal.fire({
        icon: "warning",
        title: "Please select your desired location",
        text: "browser property",
      });
      return; 
    }

    const isValidDestination = validDestinations.includes(destination);

     if (!isValidDestination) {
       setError(true);
       Swal.fire({
         icon: "error",
         title: "Invalid destination",
         text: "Please enter a valid location, type lowercase letters only @ex. norway",
       });
       return;
     }
      setError(false);
    
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stay in</span>
          </div>
          <img
            src="https://www.pngkit.com/png/full/193-1938782_illustration-of-flag-of-singapore-singapore-flag-round.png"
            alt=""
            className="featuredImg3"
          />
          <img
            src="https://www.pngkit.com/png/full/542-5428128_australia-flag-png-transparent-quality-images-png-only.png"
            alt=""
            className="featuredImg1"
          />
          <img
            src="https://www.pngkit.com/png/full/100-1006469_free-philippine-flag-png-rules-of-survival-philippines.png"
            alt=""
            className="featuredImg1"
          />
          <img
            src="https://www.pngkit.com/png/full/423-4231687_25-norway-norway-national-football-team.png"
            alt=""
            className="featuredImg1"
          />
          <img
            src="https://www.pngkit.com/png/full/329-3296114_illustration-of-flag-of-switzerland-switzerland-flag-icon.png"
            alt=""
            className="featuredImg2"
          />
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Search deals on hotels, homes, and much more...
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% of
              more with your <strong>JOHNRESERVATION</strong> account
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="headerSearchInput"
                >
                  <option value="">Select Destination</option>
                  <option value="singapore">Singapore</option>
                  <option value="australia">Australia</option>
                  <option value="philippines">Philippines</option>
                  <option value="norway">Norway</option>
                  <option value="switzerland">Switzerland</option>
                </select>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} rooms`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
