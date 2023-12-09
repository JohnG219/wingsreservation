import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./contact.css";
import { Alert } from "@mui/material";
import Swal from "sweetalert2";
import { Rings } from "react-loader-spinner";

const Contact = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentClick = () => {
    setShowConfirmation(true);
  };

  const [bidpay, setBidpay] = useState({
    atmpay: "",
    bidpay: "",
    uepay: "",
    paycard: "",
    paysec: "",
    paydate: "",
    payamount: "",
  });

  const handleChange1 = (e) => {
    const { id, value } = e.target;
    if (id === "paycard" && value.length > 20) {
      setCardNumberError(true);
    } else {
      setCardNumberError(false);
    }

    setBidpay((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleclick1 = async (e) => {
    e.preventDefault();

    if (cardNumberError) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "atleast max@20 for example 5589-8859-9652-2470",
      });
      return;
    }

    const requiredFields = [
      "atmpay",
      "bidpay",
      "uepay",
      "paycard",
      "paysec",
      "paydate",
      "payamount",
    ];
    const isAllFieldsFilled = requiredFields.every(
      (field) => bidpay[field].trim() !== ""
    );

    if (!isAllFieldsFilled) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all required fields",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure you want to proceed with the payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setShowSpinner(true);

        try {
          const res = await axios.put("/transaction/create", bidpay);
          setTimeout(() => {
            setIsLoading(false);
            setShowSpinner(false);
            setInfo({
              severity: "success",
              message: "Payment transaction success",
            });
            window.location.assign("/login");
          }, 25000);
        } catch (err) {
          // Handle error
        }
      } else {
        setShowSpinner(false);
        setIsLoading(false);
      }
    });
  };


  const [bidsc, setBidsc] = useState({
    bidcc: "",
    uecc: "",
    decc: "",
    rqs: "",
  });

  const handleChange = (e) => {
    setBidsc((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [info, setInfo] = useState({});

  const handleclick = async (e) => {
    e.preventDefault();

    const requiredFields = ["bidcc", "uecc", "decc", "rqss", "vss"];
    const isAllFieldsFilled = requiredFields.every(
      (field) => bidsc[field].trim() !== ""
    );

    if (!isAllFieldsFilled) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all required fields",
        text: "Booking ID, Email, Destination, Request, Valid Reason",
      });
      return;
    }

    try {
      const res = await axios.put("/contact/create", bidsc);
      setInfo({
        severity: "success",
        message: "Request has been sent",
      });
      window.location.reload();
    } catch (err) {
      console.log("AxiosError:", err);
      setInfo({
        severity: "error",
        message: "Error Please reload your page",
      });
    }
  };

   useEffect(() => {
     if (showConfirmation && showSpinner) {
       document.body.style.overflow = "hidden"; 
     } else {
       document.body.style.overflow = "auto"; 
     }
   }, [showConfirmation, showSpinner]);

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="bodywall">
      <div className="container1">
        <div class="personal">
          <button id="btnnn1">
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              HOME
            </NavLink>
          </button>
          <p id="adminr">Request to Admin</p>

          {info.message && (
            <Alert
              severity={info.severity}
              onClose={() => setInfo({})}
              sx={{
                width: "100%",
                maxWidth: "400px",
                fontSize: "14px",
                position: "fixed",
                left: "37%",
                top: "20%",
              }}
            >
              {info.message}
            </Alert>
          )}

          <img
            required
            className="img"
            src={user.img ? user.img : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt=""
          />
          <div className="detailItem652">
            <span className="itemKey65">Name:</span>
            <span className="itemValue65">
              &nbsp;
              {user.username}
              &nbsp;
              {user.surname}
            </span>
          </div>
          <div className="detailItem652">
            <span className="itemKey65">Email:</span>
            <span className="itemValue65">&nbsp;{user.email}</span>
          </div>
          <div className="detailItem652">
            <span className="itemKey65">Phone:</span>
            <span className="itemValue65">&nbsp;{user.phone}</span>
          </div>
          <div className="detailItem652">
            <span className="itemKey6534">Status:</span>
            <span className="status">
              <p id="appr">{user.approved}</p>
              <p id="disa">{user.disapproved}</p>
            </span>
          </div>
          <div className="detailItem652">
            <span className="itemKey65">Admin Message:</span>
            <span className="itemValue6512">{user.message}</span>
          </div>
        </div>

        <div class="formfield">
          <span className="itemKey651">Booking ID:</span>
          <input
            className="tp650"
            onChange={handleChange}
            type="text"
            id="bidcc"
            required
            placeholder="196956264160776sbce72"
          />

          <span className="itemKey651">Email:</span>
          <input
            className="tp650"
            onChange={handleChange}
            type="text"
            id="uecc"
            required
            placeholder="ex@custr.com"
          />

          <span className="itemKey651">Destination:</span>
          <input
            className="tp650"
            onChange={handleChange}
            type="text"
            id="decc"
            required
            placeholder="Norway"
          />

          <label>
            <input
              className="rInput5"
              type="checkbox"
              name="rqss"
              id="rqss"
              value="Cancelled"
              onChange={handleChange}
            />
            Cancelled
          </label>
          <label>
            <input
              className="rInput5"
              type="checkbox"
              name="rqss"
              id="rqss"
              value="Refund"
              onChange={handleChange}
            />
            Refund
          </label>

          <span className="itemKey651">Valid Reason:</span>
          <textarea
            className="tp659"
            onChange={handleChange}
            id="vss"
            required
            placeholder="Enter your message here"
            rows="4"
          />

          <div class="form-row">
            <button id="bayagri" onClick={handleclick}>
              Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="bookers">
        <span className="itemKey">Booking info:</span>
        {user.price || user.paid || user.pending ? (
          <span className="bookers1">
            {user.booked}
            <p id="price">{user.price}</p>
            <p id="paid">{user.paid}</p>
            <p id="notpaid">{user.pending}</p>
          </span>
        ) : (
          <span className="bookers1">
            <p id="nostatusbook">No Status Booked!</p>
          </span>
        )}
      </div>
      <div className="paymentss">
        {showConfirmation ? (
          <>
            <div className="paytform">
              <div class="loadingSpinner">
                {showConfirmation && showSpinner && (
                  <div className="overlay">
                    <div className="loading-indicator">
                      <Rings
                        type="Oval"
                        color="#00BFFF"
                        height={400}
                        width={400}
                      />
                      <p>Loading, please wait...</p>
                    </div>
                  </div>
                )}
              </div>
              <p id="titlepayy">Online Payment Reservation</p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                alt="Payment Confirmation"
                className="masterc"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
                alt="Payment Confirmation"
                className="paypal"
              />
              <div className="formpay">
                <div className="atmpay1234">
                  <div id="masterri">
                    <label>
                      <input
                        className="atmpay5"
                        type="checkbox"
                        name="atmpay"
                        id="atmpay"
                        value="MasterCard"
                        onChange={handleChange1}
                      />
                      MasterCard
                    </label>
                  </div>
                  <label>
                    <input
                      className="atmpay5"
                      type="checkbox"
                      name="atmpay"
                      id="atmpay"
                      value="Paypal"
                      onChange={handleChange1}
                    />
                    Paypal
                  </label>
                </div>
                <div className="userpricee">
                  <p id="paypriceee">{user.price}</p>
                </div>
                <div className="input-wrapper">
                  <input
                    className="paayyt"
                    type="text"
                    id="bidpay"
                    onChange={handleChange1}
                    placeholder="Booked ID"
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    className="paayyt"
                    type="text"
                    id="uepay"
                    onChange={handleChange1}
                    placeholder="Email"
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    className={`paayyt ${cardNumberError ? "error" : ""}`}
                    type="text"
                    id="paycard"
                    onChange={handleChange1}
                    placeholder="Card Number"
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    className="paayytcode"
                    type="password"
                    id="paysec"
                    onChange={handleChange1}
                    required
                    placeholder="Security Code CVV"
                  />
                </div>
                <div className="input-wrapper">
                  <span className="expir">Expiration Date:</span>
                  <input
                    className="expirationdatessnum"
                    onChange={handleChange1}
                    type="date"
                    id="paydate"
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <input
                    className="amountt12"
                    type="number"
                    id="payamount"
                    onChange={handleChange1}
                    required
                    placeholder="$Pay Amount"
                  />
                </div>
                <div className="button-wrapper">
                  <button class="paybutton" onClick={handleclick1}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <NavLink
            to=""
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={handlePaymentClick}
          >
            PAYMENT
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Contact;
