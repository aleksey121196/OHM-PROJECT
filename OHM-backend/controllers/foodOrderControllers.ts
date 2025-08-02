import { Request, Response } from "express";
import { FoodOrder } from "../models/foodOrder";

export const AddNewFoodOrder = async (req: Request, res: Response) => {
    try {
        const newFoodOrder = new FoodOrder(req.body);
        await newFoodOrder.save();
        res.status(201).json(newFoodOrder);
    } catch (error) {
        res.status(500).json({ error: 'Faild to add new Food Order. ' });
    }
};

export const getUserOrderHistory = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const orderHistory = await FoodOrder.find({ EmployeeId: userId }).sort({ createdAt: -1 }).limit(10);
        res.status(200).json(orderHistory);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch user order history', error });
    }
};

export const getMealOrders = async (req: Request, res: Response) => {
    try {
        const date = req.query.date as string;
        if (!date) {
            res.status(400).json({ message: 'Date query parameter is required' });
            return;
        }
        const orders = await FoodOrder.find({
            $expr: {
                $eq: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$OrderDate" } },
                    date
                ]
            }
        }).sort({ OrderDate: -1 });
        res.status(200).json(orders);
    } 
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
};

