import express from "express";
import LeaveRequestModel from "../models/leaveRequest.js";

const router = express.Router();

router.post("/submit-leave", async (req, res) => {
    try {
        const { username, startDate, endDate, leaveReason, otherReason } = req.body;

        // Create a new leave request
        const newLeaveRequest = new LeaveRequestModel({
            username,
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
