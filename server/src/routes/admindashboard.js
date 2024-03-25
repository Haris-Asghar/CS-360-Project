import express from 'express';
import AttendanceModel from '../models/Attendance.js';
import { EmployeeModel } from '../models/Employee.js'; // Import the EmployeeModel

const router = express.Router();

// Endpoint to fetch attendance records for employees present today
router.get('/present-employees', async (req, res) => {
    try {
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight

        // Find attendance records for today
        const presentAttendances = await AttendanceModel.find({ log: { $gte: today } });

        // Extract usernames from present attendance records
        const presentUsernames = presentAttendances.map(attendance => attendance.username);

        // Find employees with present usernames and role as "Employee"
        const presentEmployees = await EmployeeModel.find({ username: { $in: presentUsernames }, role: "Employee" });

        // Extract employee names from presentEmployees
        const presentEmployeeNames = presentEmployees.map(employee => ({
            fname: employee.fname,
            lname: employee.lname
        }));

        // Send the response with present employee names
        res.json(presentEmployeeNames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {router as admindashboardRouter};