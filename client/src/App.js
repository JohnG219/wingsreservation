import {
BrowserRouter ,

Route,
Routes,

} from "react-router-dom";

import Home from "./pages/home/Home"
import List from "./pages/list/List"
import Hotel from "./pages/eachHotel/Hotel.jsx";
import Login from "./pages/login/Login";
import Profile from "./components/profile/Profile";
import Booking from "./components/Bookings/Booking";
import Register from "./pages/register/Register.jsx";
import Forgot from "./components/forgot/Forgot";
import Forgotid from "./components/forgotid/Forgotid";
import EditUser from "./components/Edituser/EditUser";
import Contact from "./components/Contact/Contact";
import About from "./components/about/About";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels/room/book/:roomid" element={<Booking />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/forgotid" element={<Forgotid />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
