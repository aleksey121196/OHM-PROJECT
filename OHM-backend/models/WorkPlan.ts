import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Task schema
const TaskSchema = new Schema({
  TaskName: { type: String, required: true, trim: true },
  TaskDescription: { type: String, required: true, trim: true },
  DueDate: { type: Date, required: true },
  AssignmentType: { type: String, required: true, trim: true },
  AssignedTo: { type: String, required: true, trim: true },
  GroupLeader: { type: String, default: '', trim: true },
  Status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed', 'On Hold'],
    default: 'Pending' 
  },
  CompletedAt: { type: Date } // שדה חדש לזמן סיום בפועל
}, { _id: true });

// Weekly work plan schema
const WeeklyWorkPlanSchema = new Schema({
  PlanTitle: { type: String, required: true, trim: true },
  WeekStartDate: { type: Date, required: true },
  Department: { type: String, required: true, trim: true },
  Tasks: [TaskSchema],
  Notes: { type: String, trim: true }
});

export default model('WeeklyWorkPlans', WeeklyWorkPlanSchema, 'WeeklyWorkPlans');
