import mongoose from "mongoose";

const mealMenu = new mongoose.Schema({
    mainCourses: [{ type: String, required: true }],
    fishes: [{ type: String, required: true }],
    vegeterians: [{ type: String, required: true }],
    toppings: [{ type: String, required: true }],
    salads: [{ type: String, required: true }],
    drinks: [{ type: String, required: true }],
    
}, {
  collection: 'Meal Menus'
});

export const Menu = mongoose.model('Meal Menu', mealMenu);
