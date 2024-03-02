import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    logDate: { type: Date, default: Date.now },
    logTime: { type: String, required: true },
    leave: { type: Boolean, default: false }
});

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

export default AttendanceModel;

