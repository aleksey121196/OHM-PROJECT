import { Request, Response } from 'express';
import OverTime from '../models/OverTime';

export const addOverTime = async (req: Request, res: Response) => {
  try {
    const newOverTime = new OverTime(req.body);
    await newOverTime.save();
    res.status(201).json(newOverTime);
  } catch (error) {
    res.status(500).json({ error: 'Failed to report absence' });
  }
};


export const getAllOverTime = async (_req: Request, res: Response) => {
  try {
    const newOverTime = await OverTime.find();
    res.status(200).json(newOverTime);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching absences' });
  }
};
