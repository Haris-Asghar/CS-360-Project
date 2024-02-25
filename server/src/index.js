import express from "express";
import cors from "cors"
import mongoose from "mongoose"

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001, () => console.log("Listening at port 3001"))