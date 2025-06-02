import mongoose from "mongoose";

const BusinessMeetingsSchema = new mongoose.Schema({
    ClientName: { type: String, required: true },
    ManagerName: { type: String, required: true },
    SecretaryName:  String,
    Date: { type: Date, required: true },
    MeetingTime: { type: String, reuired: true },
    Topic: { type: String, required: true }
});

export const BusinessMeetings = mongoose.model('BusinessMeetings', BusinessMeetingsSchema, 'BusinessMeetings');