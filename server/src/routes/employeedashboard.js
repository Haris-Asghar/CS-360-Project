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
        const totalDaysThisMonth = moment().date(); // Get total days up to today in the current month
        // Calculate the number of Saturdays and Sundays until today in the current month
        let numWeekendDays = 0;
        for (let i = 1; i <= totalDaysThisMonth; i++) {
            const currentDate = moment().date(i);
            if (currentDate.day() === 0 || currentDate.day() === 6) {
                numWeekendDays++;
            }
        }
        // Subtract the number of Saturdays and Sundays from the total days in the month
        const adjustedTotalDaysThisMonth = totalDaysThisMonth - numWeekendDays;
        // Number of days with attendance records for the current month (unique days)
        const attendanceRecordsThisMonth = new Map(); // Using Map to store unique days
        let numLeavesTaken = 0;
        allAttendances.forEach(attendance => {
            const logDate = moment.utc(attendance.log).local(); // Adjust time zone to local time
            if (logDate.month() + 1 === currentMonth && logDate.year() === currentYear) {
                const logDateFormatted = logDate.format("YYYY-MM-DD");
                if (!attendance.leave) {
                    if (!attendanceRecordsThisMonth.has(logDateFormatted)) {
                        attendanceRecordsThisMonth.set(logDateFormatted, logDate.format("HH:mm:ss"));
                    }
                } else {
                    numLeavesTaken++;
                }
            }
        });
        // Number of days with attendance records for the current month
        const numDaysWithAttendance = attendanceRecordsThisMonth.size;
        const numAbsencesThisMonth = adjustedTotalDaysThisMonth - numDaysWithAttendance;
        let numLeavesRemaining = 3 - numAbsencesThisMonth - numLeavesTaken;
        if (numLeavesRemaining < 0) {
            numLeavesRemaining = 0;
        }
        res.status(200).json({ 
            totalDaysThisMonth: adjustedTotalDaysThisMonth, 
            numAttendancesThisMonth: numDaysWithAttendance, 
            numAbsencesThisMonth, 
            numLeavesTaken,
            numLeavesRemaining,
            attendanceRecordsThisMonth: Array.from(attendanceRecordsThisMonth, ([logDate, logTime]) => ({ logDate, logTime }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export { router as attendanceRouter };
