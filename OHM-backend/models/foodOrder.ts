import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
    EmployeeId: String,
    FullName: String,
    MainCourse: { type: String, required: true },
    Fish: { type: String, required: true },
    Vegeterian: { type: String, required: true },
    ToppingOne: { type: String, required: true },
    ToppingTwo: { type: String, required: true },
    Salad: { type: String, required: true },
    Drink: { type: String, required: true },
}, {
  collection: 'Food Orders'
});

export const FoodOrder = mongoose.model('Food Order', foodOrderSchema);
