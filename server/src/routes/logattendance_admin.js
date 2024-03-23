// server/routes/logattendance_admin.js

import express from "express";
import AttendanceModel from "../models/Attendance.js";

const router = express.Router();

router.post("/logattendance_admin", async (req, res) => {
    try { 
        // Extract username and role from request body
        const { username, role } = req.body;

        // Ensure the user is an admin
        if (role !== "Admin") {
            return res.status(403).json({ error: "Only admins can log attendance using this endpoint" });
        }

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

export { router as logattendanceRouter };
