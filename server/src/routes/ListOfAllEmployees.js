import express from "express";
import moment from "moment";
import { EmployeeModel } from "../models/Employee.js";
import AttendanceModel from "../models/Attendance.js";

const router = express.Router();

router.get("/list-of-all-employees", async (req, res) => {
    try {
        // Retrieve employees with role "Employee"
        const employees = await EmployeeModel.find({ role: "Employee" }, { _id: 0, username: 1, fname: 1, lname: 1 });

        // Fetch attendance records for each employee
        const employeesWithAttendanceInfo = await Promise.all(employees.map(async (employee) => {
            const { username } = employee;

            // Get all attendance records for the employee up to the current date
            const today = moment();
            const allAttendances = await AttendanceModel.find({ 
                username,
                log: { $lte: today.toDate() } // Only records up to the current date
            });

            // Get the current month and year
            const currentMonth = today.month() + 1; // Adding 1 to get the correct month format
            const currentYear = today.year();

            // Get the total days in the current month
            const totalDaysThisMonth = moment().date();

            // Calculate the number of Saturdays and Sundays up to today in the current month
            let numWeekendDays = 0;
            for (let i = 1; i <= totalDaysThisMonth; i++) {
                const currentDate = moment().date(i);
                if (currentDate.day() === 0 || currentDate.day() === 6) {
                    numWeekendDays++;
                }
            }

            // Subtract the number of Saturdays and Sundays from the total days in the month
            const adjustedTotalDaysThisMonth = totalDaysThisMonth - numWeekendDays;

            // Filter attendance records for the current month and year
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
            numLeavesRemaining = Math.max(numLeavesRemaining, 0); // Ensure numLeavesRemaining is not negative

            // Determine today's status for the employee
            let todayStatus = 'Absent'; // Default status
            const todayAttendance = allAttendances.find(attendance => {
                const logDate = moment.utc(attendance.log).local(); // Adjust time zone to local time
                return logDate.isSame(today, 'day') && !attendance.leave;
            });

            if (todayAttendance) {
                todayStatus = 'Present';
            }

            return {
                username,
                firstname: employee.fname,
                lastname: employee.lname,
                numofattendances: numDaysWithAttendance,
                numofabsences: numAbsencesThisMonth,
                todayStatus
            };
        }));

        res.status(200).json(employeesWithAttendanceInfo);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export { router as employeeListRouter };
