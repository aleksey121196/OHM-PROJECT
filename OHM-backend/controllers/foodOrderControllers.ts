import { Request, Response } from "express";
import { FoodOrder } from "../models/foodOrder";
export const AddNewFoodOrder = async (req: Request, res: Response) => {
  try {
    const {
      EmployeeId,
      FullName,
      MainCourse,
      Fish,
      Vegeterian,
      ToppingOne,
      ToppingTwo,
      Salad,
      Drink,
      OrderDate
    } = req.body;

    const isValidString = (v: any) => typeof v === 'string' && v.length <= 100;
    const isValidOptionalString = (v: any) => v === undefined || v === null || v === '' || isValidString(v);

    if (
      !isValidOptionalString(MainCourse) ||
      !isValidOptionalString(Fish) ||
      !isValidOptionalString(Vegeterian) ||
      !isValidOptionalString(ToppingOne) ||
      !isValidOptionalString(ToppingTwo) ||
      !isValidOptionalString(Salad) ||
      !isValidString(Drink)
    ) {
      res.status(400).json({ error: 'Invalid input data' });
      return;
    }
    
    // Validate that at least one main option is selected
    if (!MainCourse && !Fish && !Vegeterian && !Salad) {
      res.status(400).json({ error: 'At least one main option (Main Course, Fish, Vegeterian, or Salad) must be selected' });
      return;
    }

    let employeeIdToSave: string | undefined = undefined;
    if (EmployeeId !== undefined && EmployeeId !== null) {
      const s = String(EmployeeId).trim();
      if (s.length > 0) {
        if (s.length > 9){
            res.status(400).json({ error: 'EmployeeId too long' });
            return;
        }
        employeeIdToSave = s;
      }
    }

    let parsedOrderDate: Date | undefined = undefined;
    if (OrderDate !== undefined && OrderDate !== null && String(OrderDate).trim().length > 0) {
      const tmp = new Date(String(OrderDate));
      if (isNaN(tmp.getTime())) {
        res.status(400).json({ error: 'Invalid OrderDate format' });
        return;
      }
      parsedOrderDate = tmp;
    }

    const newFoodOrderData: any = {
      EmployeeId: employeeIdToSave,
      FullName,
      MainCourse: MainCourse || "",
      Fish: Fish || "",
      Vegeterian: Vegeterian || "",
      ToppingOne: ToppingOne || "",
      ToppingTwo: ToppingTwo || "",
      Salad: Salad || "",
      Drink
    };
    if (parsedOrderDate) newFoodOrderData.OrderDate = parsedOrderDate;

    const newFoodOrder = new FoodOrder(newFoodOrderData);
    await newFoodOrder.save();
    res.status(201).json(newFoodOrder);
    return;
  } catch (error) {
    console.error('AddNewFoodOrder error:', error);
    res.status(500).json({ error: 'Failed to add new Food Order.' });
    return;
  }
};

export const getUserOrderHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      res.status(400).json({ error: 'userId required and must be a non-empty string' });
      return;
    }
    if (userId.length > 100) {
      res.status(400).json({ error: 'userId too long' });
      return;
    }

    const orderHistory = await FoodOrder.find({ EmployeeId: userId }).sort({ createdAt: -1 }).limit(10);
    res.status(200).json(orderHistory);
    return;
  } catch (error) {
    console.error('getUserOrderHistory error:', error);
    res.status(500).json({ message: 'Failed to fetch user order history', error });
    return;
  }
};

export const getMealOrders = async (req: Request, res: Response) => {
  try {
    const dateRaw = req.query.date as string;
    if (!dateRaw) {
      res.status(400).json({ message: 'Date query parameter is required' });
      return;
    }

    const ymdRegex = /^\d{4}-\d{2}-\d{2}$/;
    let dateOnly: string;
    if (ymdRegex.test(dateRaw)) {
      dateOnly = dateRaw;
    } else {
      const parsed = new Date(dateRaw);
      if (isNaN(parsed.getTime())) {
        res.status(400).json({ message: 'Date must be valid (YYYY-MM-DD or ISO timestamp)' });
        return;
      }
      dateOnly = parsed.toISOString().slice(0, 10);
    }

    const start = new Date(dateOnly + 'T00:00:00.000Z');
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    const orders = await FoodOrder.find({
      OrderDate: { $gte: start, $lt: end }
    }).sort({ OrderDate: -1 });

    res.status(200).json(orders);
    return;
  } catch (error) {
    console.error('getMealOrders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
    return;
  }
};

export const getUserTodayOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    // Get today's date at midnight (start of day) in local time
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    
    // Get tomorrow's date at midnight (end of day) in local time
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    // Find order for today
    const todayOrder = await FoodOrder.findOne({
      EmployeeId: userId,
      OrderDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (todayOrder) {
      res.status(200).json({ hasOrder: true, order: todayOrder });
    } else {
      res.status(200).json({ hasOrder: false });
    }
  } catch (error) {
    console.error('getUserTodayOrder error:', error);
    res.status(500).json({ error: 'Failed to check today\'s order' });
  }
};
