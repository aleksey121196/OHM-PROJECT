import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import mongoose from 'mongoose';
import employeeRoutes from './routes/employeeRoutes';
import cors from 'cors';
import transportationRoutes from './routes/transportationRoutes';
import absenceRoutes from './routes/absenceRoutes';
import overTimeRoutes from './routes/overTimeRoutes';
import requestRoutes from './routes/requestRoutes';
import contactRouts from './routes/contactRouts';
import ordersRoutes from './routes/ordersRoutes';
import BusinessMeetingsRoutes from './routes/BusinessMeetingsRoutes';
import DepartmentMeetingsRoutes from './routes/DepartmentMeetingsRoutes';
import WorkPlanRoutes from './routes/WorkPlanRoutes';
import performanceRoutes from './routes/performanceRoutes';
import FoodOrderRoutes from './routes/FoodOrderRoutes';
import mealMenuRoutes from './routes/mealMenuRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.use('/api/employees', employeeRoutes);
app.use('/api/transportation', transportationRoutes);
app.use('/api/absence', absenceRoutes);
app.use('/api/overTime', overTimeRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/contactUs', contactRouts);
app.use('/api/orders', ordersRoutes);
app.use('/api/businessMeetings', BusinessMeetingsRoutes);
app.use('/api/DepartmentMeetings', DepartmentMeetingsRoutes);
app.use('/api/WorkPlan',WorkPlanRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/foodOrders", FoodOrderRoutes);
app.use("/api/mealMenus", mealMenuRoutes);




mongoose.connect('mongodb://localhost:27017/OHM-PS')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));



