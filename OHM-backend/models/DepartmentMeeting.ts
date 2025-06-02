import mongoose from "mongoose";

const DepartmentMeetingsSchema = new mongoose.Schema({
    Date: { type: Date, required: true },
    MeetingTime: { type: String, required: true },
    Department: String,
    ManagerName: String,
    Topic: { type: String, required: true }
});

export const DepartmentMeetings = mongoose.model('DepartmentMeetings', DepartmentMeetingsSchema, 'DepartmentMeetings');