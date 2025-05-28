import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  userId: String,
  FullName: String,
  Id:String,
  Department: String,
  Date: { type: String, required: true },
  RequestType: { type: String, required: true },
  RequestDescription: { type: String, required: true },
  Response: {
    Text: String,
    Responder: String,
    ResDate: String,
  },
});

export default mongoose.model('Requests', RequestSchema, 'Requests');
