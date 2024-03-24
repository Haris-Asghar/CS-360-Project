import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {EmployeeModel} from "../models/Employee.js";

const router = express.Router(); 

router.post("/register", async (req, res) => {
    const {role, username, fname, lname, salary, email, pnumber, password} = req.body;
    const employee = await EmployeeModel.findOne({username});

    if(employee) return res.status(400).send("User already exists");

    const hash = await bcrypt.hash(password, 10);
    const newEmployee = new EmployeeModel({role, username, fname, lname, salary, email, pnumber, password: hash});
    await newEmployee.save();
    res.status(200).send("User registered");
});

router.post("/register2", async (req, res) => {
    const {role, username, fname, lname, salary, email, pnumber, password, biometricdata} = req.body;
    const employee = await EmployeeModel.findOne({username});

    if(employee) return res.status(400).send("User already exists");

    const hash = await bcrypt.hash(password, 10);
    const newEmployee = new EmployeeModel({role, username, fname, lname, salary, email, pnumber, password: hash, biometricdata});
    await newEmployee.save();
    res.status(200).send("User registered with biometric");
});

router.post("/login", async (req, res) => {
    const {role, username, password} = req.body;
    const employee = await EmployeeModel.findOne({username});

    if(!employee) return res.status(400).send("Employee not found");

    if (role !== employee.role) return res.status(400).send("Employee not found");
    const match = await bcrypt.compare(password, employee.password);

    if(!match) return res.status(400).send("Wrong password");
    const token = jwt.sign({id: employee._id}, "secret");

    res.status(200).send({token, employeeID: employee._id, employeeRole: employee.role});
});  

router.post("/login2", async (req, res) => {
  const { role, username, password, biometricdata } = req.body;
  const employee = await EmployeeModel.findOne({ username });

  if (!employee) return res.status(400).send("Employee not found");

  if (role !== employee.role) return res.status(400).send("Employee not found");
  const match = await bcrypt.compare(password, employee.password);

  if (!match) return res.status(400).send("Wrong password");
  const token = jwt.sign({ id: employee._id }, "secret");

  if (biometricdata == null){
    return res.status(400).send("Biometric data not found");
  }
// Add code here for biometric authentication, use libraries dependent on your bioemtric method.

  res
    .status(200)
    .send({ token, employeeID: employee._id, employeeRole: employee.role });
});   

export {router as employeeRouter};