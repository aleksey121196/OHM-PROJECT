import { Request, Response } from "express";
import { Menu } from "../models/MealsMenu";
import moment from "moment";

export const createMenu = async (req: Request, res: Response) => {

    try {

        const newMenu = new Menu(req.body);
        await newMenu.save();
        res.status(201).json(newMenu);

    } catch (error) {

        console.error('Error creating menu: ', error);
        if (error instanceof Error) {
            res.status(500).json({ error: 'Failed to add new Menu!' });
        }
        else {
            res.status(500).json({ error: 'An unknown error occured!' });
        }

    }

};


export const getMenu = async (req: Request, res: Response) => {
    try {
        // Get the start and end of today
        const startOfToday = moment().startOf('day').toDate(); // Midnight today
        const endOfToday = moment().endOf('day').toDate(); // Just before midnight today

        // Query to fetch menus created today
        const todaysMenus = await Menu.find({
            createdAt: {
                $gte: startOfToday,  // Greater than or equal to midnight today
                $lte: endOfToday     // Less than or equal to just before midnight today
            }
        });

        // Return the fetched menus
        res.json(todaysMenus);

    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ message: 'Error fetching menus', error });
    }
};