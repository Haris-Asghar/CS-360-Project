import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true},
    logDate: { type: Date, default: Date.now },
    logTime: { type: String, required: true },
    leave: { type: Boolean, default: false }
});

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

export default AttendanceModel;

