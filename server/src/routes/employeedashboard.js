import express from "express";
import moment from "moment";
import AttendanceModel from "../models/Attendance.js";

const router = express.Router();

router.get("/attendance-info/:username", async (req, res) => {
    const { username } = req.params;

    try {
        // Get all attendance records for the user
        const allAttendances = await AttendanceModel.find({ username });
        // Get today's date and the current month
        const today = moment();
        const currentMonth = today.month() + 1; // Adding 1 to get the correct month format
        const currentYear = today.year();
        // Total number of days in the current month
        const totalDaysThisMonth = moment().date(); // Get total days in the current month
        // Number of days with attendance records for the current month (unique days)
        const attendanceRecordsThisMonth = new Map(); // Using Map to store unique days
        allAttendances.forEach(attendance => {
            const logDate = moment.utc(attendance.log).local(); // Adjust time zone to local time
            if (logDate.month() + 1 === currentMonth && logDate.year() === currentYear) {
                const logDateFormatted = logDate.format("YYYY-MM-DD");
                if (!attendanceRecordsThisMonth.has(logDateFormatted)) {
                    attendanceRecordsThisMonth.set(logDateFormatted, logDate.format("HH:mm:ss"));
                }
            }
        });
        // Number of absences (days without attendance) for the current month
        const numDaysWithAttendance = attendanceRecordsThisMonth.size;
        const numAbsencesThisMonth = totalDaysThisMonth - numDaysWithAttendance;
        // Number of leaves remaining (assuming 3 leaves allowed by default)
        let numLeavesRemaining = 3 - numAbsencesThisMonth;
        if (numLeavesRemaining < 0) {
            numLeavesRemaining = 0;
        }
        res.status(200).json({ 
            totalDaysThisMonth, 
            numAttendancesThisMonth: numDaysWithAttendance, 
            numAbsencesThisMonth, 
            numLeavesRemaining,
            attendanceRecordsThisMonth: Array.from(attendanceRecordsThisMonth, ([logDate, logTime]) => ({ logDate, logTime }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export { router as attendanceRouter };
