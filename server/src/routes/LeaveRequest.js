import express from "express";
import LeaveRequestModel from "../models/leaveRequest.js";
import EmployeeModel from "../models/Employee.js";

const router = express.Router();

router.post("/submit-leave", async (req, res) => {
    try {
        const { username, startDate, endDate, leaveReason, otherReason } = req.body;

        // Fetch employee details using username
        const employee = await EmployeeModel.findOne({ username });
        if (!employee) {
            return res.status(404).json({ error: "Employee not found with the provided username" });
        }

        // Check if there is already a leave request for the same username and overlapping duration
        const existingLeaveRequest = await LeaveRequestModel.findOne({
            username,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
                { startDate: startDate, endDate: endDate }, // Check for exact same dates
            ]
        });

if (startDate === endDate) {
// Fetch all leave requests for the same username
const allLeaveRequests = await LeaveRequestModel.find({ username });

// Check if the start date is the same as the end date for any existing leave request
for (const leaveRequest of allLeaveRequests) {
    // Extract date part (year-month-day) from leave request's start and end dates
    const leaveRequestStartDate = leaveRequest.startDate.toISOString().slice(0, 10);
    const leaveRequestEndDate = leaveRequest.endDate.toISOString().slice(0, 10);

    // Extract date part (year-month-day) from the new leave request's start and end dates
    const newLeaveRequestStartDate = new Date(startDate).toISOString().slice(0, 10);
    const newLeaveRequestEndDate = new Date(endDate).toISOString().slice(0, 10);

    // Check if the date parts match
    if (leaveRequestStartDate === newLeaveRequestStartDate && leaveRequestEndDate === newLeaveRequestEndDate) {
        // If a leave request with the same start and end date is found, return error
        return res.status(400).json({ error: "Leave request for the given duration already exists" });
    }
}

}


        if (existingLeaveRequest) {
            return res.status(400).json({ error: "Leave request for the given duration already exists" });
        }

        // Create a new leave request
        const newLeaveRequest = new LeaveRequestModel({
            username,
            firstName: employee.fname,
            lastName: employee.lname,
            startDate,
            endDate,
            leaveReason,
            otherReason
        });

        // Save the new leave request
        await newLeaveRequest.save();

        res.status(201).json({ message: "Leave request submitted successfully" });
    } catch (error) {
        console.error("Error submitting leave request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/leave-requests", async (req, res) => {
    try {
        // Retrieve all leave requests
        const leaveRequests = await LeaveRequestModel.find();
        res.status(200).json(leaveRequests);
    } catch (error) {
        console.error("Error fetching leave requests:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/leave-request/:username", async (req, res) => {
    try {
        const { username } = req.params;

        // Retrieve leave requests by username
        const leaveRequests = await LeaveRequestModel.find({ username });
        
        if (!leaveRequests || leaveRequests.length === 0) {
            return res.status(404).json({ error: "Leave requests not found for this username" });
        }

        res.status(200).json(leaveRequests);
    } catch (error) {
        console.error("Error fetching leave requests by username:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.put("/approve-leave/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the leave request by id and update its status to "Approved"
        const updatedLeaveRequest = await LeaveRequestModel.findByIdAndUpdate(id, { status: "Approved" }, { new: true });

        res.status(200).json(updatedLeaveRequest);
    } catch (error) {
        console.error("Error approving leave request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/reject-leave/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the leave request by id and update its status to "Rejected"
        const updatedLeaveRequest = await LeaveRequestModel.findByIdAndUpdate(id, { status: "Rejected" }, { new: true });

        res.status(200).json(updatedLeaveRequest);
    } catch (error) {
        console.error("Error rejecting leave request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export {router as leaveRequestRouter};

