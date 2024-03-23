import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { employeeRouter } from "./routes/employee.js";
import { logattendanceRouter } from "./routes/logattendance.js";
import { attendanceRouter } from "./routes/employeedashboard.js";
import { leaveRequestRouter } from "./routes/LeaveRequest.js";

dotenv.config();

const app = express();
const username = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_CLUSTER_NAME;

app.use(express.json());
app.use(cors());
// const newstr = `mongodb+srv://${username}:${password}@${dbName}.c0zyvyg.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbName}`
// console.log(newstr)

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
