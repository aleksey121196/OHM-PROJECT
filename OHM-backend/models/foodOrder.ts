import mongoose from "mongoose";

const foodOrderSchema = new mongoose.Schema({
  OrderDate: { type: Date, default: Date.now ,required: true },
  EmployeeId: String,
  FullName: String,
  MainCourse: { type: String, default: "" },
  Fish: { type: String, default: "" },
  Vegeterian: { type: String, default: "" },
  ToppingOne: { type: String, default: "" },
  ToppingTwo: { type: String, default: "" },
  Salad: { type: String, default: "" },
  Drink: { type: String, required: true },
});

export const FoodOrder = mongoose.model('FoodOrders', foodOrderSchema,'FoodOrders');
