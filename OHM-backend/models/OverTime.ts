import mongoose from "mongoose";

const OverTimeSchema = new mongoose.Schema({
    UserId: String,
    FullName: String,
    Id: String,
    Department: String,
    Date: { type: String, required: true },
    ExitTime: { type: String, required: true }

});

export default mongoose.model('Overtimes',OverTimeSchema,'Overtimes');