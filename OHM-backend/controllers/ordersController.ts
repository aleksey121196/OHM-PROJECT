import { Request,Response } from "express";
import orders from "../models/orders";

export const addOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = new orders(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save order', error });
  }
};

// Get all orders
export const getOrders = async (_req: Request, res: Response) => {
  try {
    const getorders = await orders.find();
    res.status(200).json(getorders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};


export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await orders.findByIdAndUpdate(
      id,
      { Status: status },
      { new: true }
    );

    if (!updatedOrder) {
       res.status(404).json({ message: 'Order not found' });
    }

     res.json({ message: 'Order status updated', updatedOrder });
  } catch (error) {
       res.status(500).json({ message: 'Failed to update order status in controllers', error });
  }
};