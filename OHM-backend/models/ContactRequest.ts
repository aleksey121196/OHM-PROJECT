import mongoose from 'mongoose';

const contactRequestSchema = new mongoose.Schema({
  FullName: { type: String, required: true },
  Email: { type: String, required: true },
  Message: { type: String, required: true },
  Date: { type: Date, default: Date.now }
});

export const ContactRequest = mongoose.model('ContactRequests', contactRequestSchema,'ContactRequests');
