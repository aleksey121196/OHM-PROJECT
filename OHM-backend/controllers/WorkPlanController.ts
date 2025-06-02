import { Request, Response } from "express";
import WorkPlan from "../models/WorkPlan";
import { Types } from "mongoose";

interface IUserTask {
  _id: Types.ObjectId;
  TaskName: string;
  TaskDescription: string;
  DueDate: Date;
  AssignmentType: string;
  AssignedTo: string;
  GroupLeader: string;
  Status: string;
  PlanId: Types.ObjectId;
  PlanTitle: string;
  WeekStartDate: Date;
  Department: string;
}

// Allowed status values - should match your model's enum
const allowedStatuses = ['Pending', 'In Progress', 'Completed', 'On Hold'];

export const AddWorkPlan = async (req: Request, res: Response) => {
  try {
    const { PlanTitle, WeekStartDate, Department, Tasks, Notes } = req.body;

    if (!PlanTitle || !WeekStartDate || !Department) {
      res.status(400).json({ error: "PlanTitle, WeekStartDate, and Department are required." });
      return;
    }

    if (Tasks && !Array.isArray(Tasks)) {
      res.status(400).json({ error: "Tasks must be an array." });
      return;
    }

    const newWorkPlan = new WorkPlan({
      PlanTitle,
      WeekStartDate,
      Department,
      Notes: Notes || '',
      Tasks: Tasks || []
    });

    await newWorkPlan.save();
    res.status(201).json(newWorkPlan);
    return;
  } catch (error) {
    console.error("AddWorkPlan error:", error);
    res.status(500).json({ error: "Failed to add new Work Plan." });
    return;
  }
};

export const getMyTasks = async (req: Request, res: Response) => {
  try {
    // Make sure req.user and req.user.FullName are present and correctly capitalized
    if (!req.user || !req.user.FullName) {
      res.status(401).json({ message: "Unauthorized: User info missing." });
      return;
    }

    const userFullName = req.user.FullName.trim();

    const plans = await WorkPlan.find({
      Tasks: {
        $elemMatch: {
          $or: [
            { AssignedTo: new RegExp(`^${userFullName}$`, 'i') },
            { GroupLeader: new RegExp(`^${userFullName}$`, 'i') }
          ]
        }
      }
    }).lean();

    const userTasks: IUserTask[] = [];

    plans.forEach(plan => {
      (plan.Tasks || []).forEach(task => {
        const assignedToLower = task.AssignedTo?.toLowerCase() || '';
        const groupLeaderLower = task.GroupLeader?.toLowerCase() || '';
        const userLower = userFullName.toLowerCase();

        if (assignedToLower === userLower || groupLeaderLower === userLower) {
          userTasks.push({
            _id: task._id,
            TaskName: task.TaskName,
            TaskDescription: task.TaskDescription,
            DueDate: task.DueDate,
            AssignmentType: task.AssignmentType,
            AssignedTo: task.AssignedTo,
            GroupLeader: task.GroupLeader,
            Status: task.Status,
            PlanId: plan._id,
            PlanTitle: plan.PlanTitle,
            WeekStartDate: plan.WeekStartDate,
            Department: plan.Department,
          });
        }
      });
    });

    res.json(userTasks);
    return;
  } catch (error) {
    console.error("getMyTasks error:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
    return;
  }
};


export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { newStatus } = req.body;

    if (!req.user || !req.user.FullName) {
      res.status(401).json({ message: "Unauthorized: User info missing." });
      return;
    }

    if (!taskId || !newStatus) {
      res.status(400).json({ message: "taskId and newStatus are required." });
      return;
    }

    if (!allowedStatuses.includes(newStatus)) {
      res.status(400).json({ message: `newStatus must be one of: ${allowedStatuses.join(', ')}` });
      return;
    }

    const userFullName = req.user.FullName.trim();

    // Find the WorkPlan document containing the task assigned to this user
    const plan = await WorkPlan.findOne({
      "Tasks._id": taskId,
      Tasks: {
        $elemMatch: {
          _id: taskId,
          $or: [
            { AssignedTo: new RegExp(`^${userFullName}$`, 'i') },
            { GroupLeader: new RegExp(`^${userFullName}$`, 'i') }
          ]
        }
      }
    });

    if (!plan) {
      res.status(404).json({ message: "Task not found or not assigned to you." });
      return;
    }

    // Find the task inside the Tasks array
    const task = plan.Tasks.id(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found inside the work plan." });
      return;
    }

    // Update status
    task.Status = newStatus;

    // Save the updated document
    await plan.save();

    res.json({ message: "Task status updated successfully.", task });
    return;
  } catch (error) {
    console.error("updateTaskStatus error:", error);
    res.status(500).json({ message: "Failed to update task status." });
    return;
  }
};
