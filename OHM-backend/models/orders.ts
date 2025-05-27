import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  ClientFullName: { type: String, required: true },
  ClientEmail: { type: String, required: true },
  ClientPhone: { type: String, required: true },
  MeetingDate: { type: Date },
  OrderDetails: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  Status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'In Progress', 'Completed']
  }
});

export default mongoose.model('Orders', orderSchema,'Orders');
