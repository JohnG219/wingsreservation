import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { id } from "date-fns/locale";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [pr, setpr] = useState("");
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates, options } = useContext(SearchContext);

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

  const handleClick = async () => {
    if (selectedRooms.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select at least one room number to proceed with the reservation.",
      });
      return;
    }

    const selectedRoomData = selectedRooms.map((roomId) => {
      const selectedRoom = data.find((item) =>
        item.roomNumbers.some((rn) => rn._id === roomId)
      );
      return selectedRoom
        ? {
            number: selectedRoom.roomNumbers.find((rn) => rn._id === roomId)
              .number,
            title: selectedRoom.title,
          }
        : null;
    });
    const selectedRoomNumbers = selectedRoomData.filter(Boolean);

    const totalPrice = selectedRoomNumbers.reduce((acc, room) => {
      const item = data.find((hotelRoom) => hotelRoom.title === room.title);
      return acc + days * item.price * options.room;
    }, 0);

    const isConfirmed = await Swal.fire({
      icon: "question",
      title: "Are you sure?",
      html: `Confirm your reservation for the selected room(s): ${selectedRoomNumbers
        .map((room) => `${room.title} - ${room.number}`)
        .join(", ")}<br/><br/>
      Total Price: $${totalPrice}`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!isConfirmed.isConfirmed) {
      return;
    }

    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          //navigate(`/book/${selectedRooms}`)
          navigate(`/hotels/room/book/${selectedRooms}`, {
            state: { selectedRooms, hotelId, selectedRoomNumbers, totalPrice },
          });
          return res.data;
        })
      );
      console.log(pr);
      setOpen(false);

      // navigate("/")
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">Room Id:</div>
              <div className="rTitle">{item._id}</div>
              <hr />
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">
                ${days * item.price * options.room} for {days} days
              </div>
              <p id="repl">{item.dest}</p>
              <p id="repl">{item.htl}</p>
              <p id="repl">{item.loc}</p>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  {!isAvailable(roomNumber) ? (
                    <p id="booked">booked</p>
                  ) : (
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      //hidden={!isAvailable(roomNumber)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Confirmed Reservation
        </button>
      </div>
    </div>
  );
};

export default Reserve;
