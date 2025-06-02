import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

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
    enum: ['Pending', 'In Progress', 'Completed', 'On Hold'], // Better control of statuses
    default: 'Pending' 
  }
}, { _id: true });

// Weekly work plan schema
const WeeklyWorkPlanSchema = new Schema({
  PlanTitle: { type: String, required: true, trim: true },
  WeekStartDate: { type: Date, required: true },
  Notes: { type: String, default: '', trim: true },
  Department: { type: String, required: true, trim: true },
  Tasks: { type: [TaskSchema], default: [] }
}, { timestamps: true });

export default model('WeeklyWorkPlans', WeeklyWorkPlanSchema, 'WeeklyWorkPlans');
