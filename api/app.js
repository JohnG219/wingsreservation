import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import path from "path"; 
import cors from "cors";
import customersRoute from "./routes/customers.js";
import contactRoute from "./routes/contact.js";
import transactionRoute from "./routes/transaction.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors({
  origin: "https://frontend-reservationappmern.onrender.com",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/customers", customersRoute);
app.use("/api/contact", contactRoute);
app.use("/api/transaction", transactionRoute);

app.use(express.static(path.join(__dirname, 'https://frontend-reservationappmern.onrender.com')));

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'https://frontend-reservationappmern.onrender.com', 'index.html'));
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
