import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connect to mongo db");
  } catch (error) {
    throw error("cannot connect to mongo db");
  }
};

app.get("/", (req, res) => {
  res.send("hello first request");
});

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(3001, () => {
  connection();
});
