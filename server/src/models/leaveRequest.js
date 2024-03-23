import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  leaveReason: { type: String, required: true },
  otherReason: { type: String },
  status: { type: String, default: "Pending" }, // Status can be "Pending", "Approved", "Rejected"
});

const LeaveRequestModel = mongoose.model("LeaveRequest", leaveRequestSchema);
export default LeaveRequestModel;
