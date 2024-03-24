import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { employeeRouter } from "./src/routes/employee.js";
import { logattendanceRouter } from "./src/routes/logattendance.js";
import { attendanceRouter } from "./src/routes/employeedashboard.js";
import { leaveRequestRouter } from "./src/routes/LeaveRequest.js";

dotenv.config();

const app = express();
const username = "segroup";
const password = "segroup9pass";
const dbName = "cs360";

app.use(express.json());
app.use(cors(
  {
    origin: "https://cs-360-project.vercel.app/",
    methods: ["GET", "POST"],
    credentials: true
  }
));

mongoose.connect(`mongodb+srv://${username}:${password}@${dbName}.c0zyvyg.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbName}`)
  .then(() => {
    console.log("\x1b[34m%s\x1b[0m", "DB connected"); 
    app.listen(3001, () => console.log("\x1b[33m%s\x1b[0m", "Listening at port 3001"));
  })
  .catch((err) => {
    console.error("\x1b[31m%s\x1b[0m", "DB connection error");
  });

app.use("/auth", employeeRouter);
app.use("/attendance",attendanceRouter);
app.use("/leave", leaveRequestRouter);
app.use("/log", logattendanceRouter);
