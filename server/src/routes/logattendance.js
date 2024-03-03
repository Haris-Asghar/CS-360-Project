import express from "express";
import AttendanceModel from "../models/Attendance.js";

const router = express.Router();
router.post("/log-attendance", async (req, res) => {
    try {
        // Extract username from request body
        const { username } = req.body;

        // Get the current time
        const currentTime = new Date();
        // Create a new attendance record with current time
        const newAttendance = new AttendanceModel({
            username,
            log: currentTime,
            leave: false // Assuming attendance is not leave
        });

        // Save the new attendance record
        await newAttendance.save();

        res.status(201).json({ message: "Attendance logged successfully" });
    } catch (error) {
        console.error("Error logging attendance:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { router as logattendanceRouter };
