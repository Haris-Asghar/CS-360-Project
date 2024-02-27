import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    role: {type: String, required: true},
    username: {type: String, required: true, unique:true},
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    salary: {type: Number, required: true},
    email: {type: String, required: true},
    pnumber: {type: String, required: true},
    password: {type: String, required: true}
});

export const EmployeeModel = mongoose.model("employee", employeeSchema);