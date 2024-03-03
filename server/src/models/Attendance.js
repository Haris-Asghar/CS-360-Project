import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    username: { type: String, required: true },
    log: { type: Date, default: Date.now },
    leave: { type: Boolean, default: false }
});

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
export default AttendanceModel;


