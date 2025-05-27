import mongoose from 'mongoose';

const AbsenceSchema = new mongoose.Schema({
  userId: String,
  FullName: String,
  Id:String,
  Department: String,
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  absenceType: { type: String, required: true },
  reason: { type: String, required: true }
});

export default mongoose.model('Absences', AbsenceSchema, 'Absences');
