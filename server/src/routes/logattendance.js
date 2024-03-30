import express from "express";
import AttendanceModel from "../models/Attendance.js";

const router = express.Router();
router.post("/log-attendance", async (req, res) => {
    try { 
        // Extract username from request body
        const { username } = req.body;

        // Get the current date
        const currentDate = new Date();
        
        // Check if attendance record already exists for the same username and the same date
        const existingAttendance = await AttendanceModel.findOne({ username, log: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1) } });

        // If attendance record already exists for the same username and the same date, send a response
        if (existingAttendance) {
            return res.status(400).json({ error: "Attendance already logged for today" });
        }

        // Create a new attendance record with current time
        const newAttendance = new AttendanceModel({
            username,
            log: currentDate,
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

router.post("/log-attendance2", async (req, res) => {
    try { 
        // Extract username from request body
        const { biometricData } = req.body;

        res.status(201).json({ message: "Backend Logic is upto client" });
    } catch (error) {
        console.error("Error logging attendance:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export { router as logattendanceRouter };

