import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Edituser.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Alert } from "@mui/material";
import { ColorRing } from "react-loader-spinner";

const EditUser = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [credentials1, setCredentials1] = useState({
    email: undefined,
    password: undefined,
    username: undefined,
    country: undefined,
    city: undefined,
    img: undefined,
    phone: undefined,
  });

  const isPasswordRequired = () => {
    return (
      isButtonClicked &&
      (!credentials1.password || credentials1.password.length < 6)
    );
  };

  const { error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();


  //   Handle Change Function
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setCredentials1((prev) => ({ ...prev, [id]: value }));

    if (id === "password") {
      if (value.length < 6) {
        setPasswordError(true);
        e.target.setCustomValidity(
          "Password must be at least 6 characters long"
        );
      } else {
        setPasswordError(false);
        e.target.setCustomValidity("");
      }
      e.target.reportValidity();
    }
  };

  // Handle Click Function
  const handleClick = async (e) => {
    e.preventDefault();
    setIsButtonClicked(true);
    setLoading(true);

    if (credentials1.password && credentials1.password.length < 6) {
      setPasswordError(true);
      setLoading(false);
      return;
    }

    const updatedCredentials = { ...credentials1 };
    delete updatedCredentials.img;

    try {
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dr4iesryu/image/upload",
          data
        );
        const { url } = uploadRes.data;
        updatedCredentials.img = url;
      }

      const res = await axios.put(
        `/users/update/${user._id}`,
        updatedCredentials
      );
      setInfo({
        severity: "success",
        message: "Credentials Update Success!",
      });
      window.location.assign("/login");
    } catch (err) {
      console.log(err);
      setInfo({
        severity: "error",
        message:
          "Old/New password is required! The most efficient way you can avoid being hacked",
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(credentials1);

  return (
    <div className="login2">
      <div className="lContainer13">
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : user.img
              ? user.img
              : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
          }
          alt=""
        />

        <label htmlFor="file">
          <div id="iconsss">
            Profile picture: <DriveFolderUploadOutlinedIcon className="icon" />
          </div>
        </label>

        <div className="inputs">
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />

          <button className="lButton300">
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Home
            </NavLink>
          </button>
          <span className="sp22">
            Update profile info, {user.username} <br></br>
          </span>
          <p id="oldpass">
            Required! type your old password or you can change your password as
            well.
          </p>
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

          <input
            type="username"
            className="lInput7"
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
          <input
            type="tel"
            className="lInput7"
            placeholder="Contact#"
            id="phone"
            onChange={handleChange}
          />
          <input
            type="text"
            className="lInput7"
            placeholder="Country"
            id="country"
            onChange={handleChange}
          />
          <input
            type="text"
            className="lInput7"
            placeholder="City"
            id="city"
            onChange={handleChange}
          />
          <input
            type="password"
            className={`lInput7 ${isPasswordRequired() ? "error" : ""}`}
            placeholder="Password"
            id="password"
            onChange={handleChange}
            required
            disabled={error}
            style={{ color: "black" }}
          />
          <input
            type="email"
            className="lInput7"
            placeholder="Email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div class="newring">
          {loading ? (
            <div style={{ position: "relative", left: "27px" }}>
              <ColorRing
                type="ThreeDots"
                color="#00BFFF"
                height={50}
                width={50}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          ) : (
            <button onClick={handleClick} className="lButton99">
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
