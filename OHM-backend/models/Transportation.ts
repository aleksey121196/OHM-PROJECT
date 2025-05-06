import mongoose from 'mongoose';

const TransportationSchema = new mongoose.Schema({
  userId: String,
  Id:String,
  FullName: String,
  Phone:String,
  date: { type: String, required: true },
  Time:{ type: String, required: true },
  transportationType: { type: String, required: true }, 
  destination: { type: String, required: true }
});

export default mongoose.model('Transportation', TransportationSchema, 'Transportation');
