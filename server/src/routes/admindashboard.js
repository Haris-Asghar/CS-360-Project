import express from "express";
import AttendanceModel from "../models/Attendance.js";
import { EmployeeModel } from "../models/Employee.js";

const router = express.Router();

router.get("/all_employee_info", async (req, res) => {
    const { username, role } = req.body;
    try {
       const today = new Date();
       // Set hours, minutes, seconds, and milliseconds to 0 to consider the entire day
       const startOfDay = new Date(today);
       startOfDay.setHours(0, 0, 0, 0);
       // Set hours to 23, minutes to 59, seconds to 59, and milliseconds to 999 to consider end of day
       const endOfDay = new Date(today);

       endOfDay.setHours(23, 59, 59, 999);

       const totalEmployees = await EmployeeModel.countDocuments();

       // Number of employees present today
       const presentEmployees = await AttendanceModel.countDocuments({
         log: { $gte: startOfDay, $lte: endOfDay },
         leave: false,
       });

       // Number of employees absent today
       const absentEmployees = totalEmployees - presentEmployees;

       res.status(200).json({ 
            totalEmployees, 
            presentEmployees, 
            absentEmployees, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});




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