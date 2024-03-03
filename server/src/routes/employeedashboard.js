import express from "express";
import moment from "moment";
import AttendanceModel from "../models/Attendance.js";

const router = express.Router();

router.get("/attendance-info/:username", async (req, res) => {
    const { username } = req.params;

    try {
        // Get all attendance records for the user
        const allAttendances = await AttendanceModel.find({ username });
        //console.log(allAttendances);

        // Get today's date and the current month
        const today = moment();
        const currentMonth = today.month() + 1; // Adding 1 to get the correct month format
        const currentYear = today.year();

        // Get the first day of the current month
        const firstDayOfMonth = moment().startOf('month');

        // Total number of days in the current month
        const totalDaysThisMonth = today.date(); // Today's date is the total number of days

        // Number of days with attendance records for the current month
        let numDaysWithAttendance = 0;
        const attendanceRecordsThisMonth = [];
        allAttendances.forEach(attendance => {
            const logDate = moment.utc(attendance.log).local(); // Adjust time zone to local time
            if (logDate.month() + 1 === currentMonth && logDate.year() === currentYear && logDate.date() <= today.date()) {
                numDaysWithAttendance++;
                attendanceRecordsThisMonth.push({ logDate: logDate.format("YYYY-MM-DD"), logTime: logDate.format("HH:mm:ss") });
            }
        });

        // Number of absences (days without attendance) for the current month
        const numAbsencesThisMonth = totalDaysThisMonth - numDaysWithAttendance;

        // Number of leaves remaining (assuming 3 leaves allowed by default)
        const numLeavesRemaining = 3 - numDaysWithAttendance;

        res.status(200).json({ 
            totalDaysThisMonth, 
            numAttendancesThisMonth: numDaysWithAttendance, 
            numAbsencesThisMonth, 
            numLeavesRemaining,
            attendanceRecordsThisMonth
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export { router as attendanceRouter };