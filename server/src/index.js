import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import {employeeRouter} from "./routes/employee.js"

dotenv.config()

const app = express();
const username = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_CLUSTER_NAME;

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${username}:${password}@${dbName}.c0zyvyg.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbName}`)

app.use("/auth", employeeRouter);

app.listen(3001, () => console.log("Listening at port 3001"))