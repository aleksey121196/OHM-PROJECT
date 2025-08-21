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
        const startOfToday = moment().startOf('day').toDate(); 
        const endOfToday = moment().endOf('day').toDate(); 

        const todaysMenus = await Menu.find({
            createdAt: {
                $gte: startOfToday,  
                $lte: endOfToday     
            }
        });

        // Return the fetched menus
        res.json(todaysMenus);

    } catch (error) {
        console.error('Error fetching menus:', error);
        res.status(500).json({ message: 'Error fetching menus', error });
    }
};