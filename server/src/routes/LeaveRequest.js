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

