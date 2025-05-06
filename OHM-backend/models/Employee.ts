import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  FullName: { type: String, required: true },
  Email: { type: String, required: true },
  Phone: String,
  Address: String,
  Id: { type: String, required: true, unique:true },
  JobTitle: String,
  EmploymentDate: String,
  Department: String,
  Status: String,
  UserName: { type: String, required: true, unique: true },
  Role: String,
  Password: { type: String, required: true },
  EmployerName: String
}, {
  collection: 'Employees' // 👈 זה החלק שמכריח להשתמש באוסף בשם המדויק
});

export const Employee = mongoose.model('Employee', employeeSchema);
