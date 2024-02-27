import express from "express";
import cors from "cors"
import mongoose from "mongoose"

import {employeeRouter} from "./routes/employee.js"

const app = express();


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://segroup:segroup9pass@cs360.c0zyvyg.mongodb.net/cs360?retryWrites=true&w=majority&appName=cs360")

app.use("/auth", employeeRouter);

app.listen(3001, () => console.log("Listening at port 3001"))