import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import {employeeRouter} from "./routes/employee.js"

const app = express();
const username = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${username}:${password}@cs360.c0zyvyg.mongodb.net/cs360?retryWrites=true&w=majority&appName=cs360`)

app.use("/auth", employeeRouter);

app.listen(3001, () => console.log("Listening at port 3001"))