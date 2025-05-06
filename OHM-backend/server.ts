import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import mongoose from 'mongoose';
import employeeRoutes from './routes/employeeRoutes';
import cors from 'cors';
import transportationRoutes from './routes/transportationRoutes';
import absenceRoutes from './routes/absenceRoutes';
import overTimeRoutse from './routes/overTimeRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());




// התחברות למסד הנתונים OHM-PS
mongoose.connect('mongodb://localhost:27017/OHM-PS')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));



// כל הבקשות שיתחילו ב־/api/employees ילכו ל־employeeRoutes
app.use('/api/employees', employeeRoutes);
//כל הבקשות של employee
app.use('/api/transportation', transportationRoutes);
//כל הבקשות של employee

app.use('/api/absence', absenceRoutes);
app.use('/api/overTime', overTimeRoutse);
