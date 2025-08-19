import { Request, Response } from "express";
import WorkPlan from "../models/WorkPlan";
import moment from "moment";

export const getDepartmentPerformanceSummary = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.Department) {
      res.status(401).json({ message: "Unauthorized: Department info missing." });
      return;
    }

    const userDepartment = req.user.Department.trim();
    const now = moment();
    const startOfWeek = now.clone().startOf('week').toDate();
    const endOfWeek = now.clone().endOf('week').toDate();

    const summary = await WorkPlan.aggregate([
      { $unwind: "$Tasks" },
      {
        $match: {
          Department: userDepartment,
          WeekStartDate: { $gte: startOfWeek, $lte: endOfWeek }
        }
      },
      {
        $addFields: {
          week: { $isoWeek: "$WeekStartDate" }
        }
      },
      {
        $group: {
          _id: "$week",
          week: { $first: { $isoWeek: "$WeekStartDate" } },
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$Tasks.Status", "Completed"] }, 1, 0]
            }
          },
          overdueTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $lt: ["$Tasks.DueDate", new Date()] },
                    { $ne: ["$Tasks.Status", "Completed"] }
                  ]
                },
                1,
                0
              ]
            }
          },
          pendingTasks: {
            $sum: {
              $cond: [{ $eq: ["$Tasks.Status", "Pending"] }, 1, 0]
            }
          },
          inProgressTasks: {
            $sum: {
              $cond: [{ $eq: ["$Tasks.Status", "In Progress"] }, 1, 0]
            }
          },
          onHoldTasks: {
            $sum: {
              $cond: [{ $eq: ["$Tasks.Status", "On Hold"] }, 1, 0]
            }
          }
        }
      },
      { $sort: { week: 1 } }
    ]);

    res.json(summary);
  } catch (error) {
    console.error("getDepartmentPerformanceSummary error:", error);
    res.status(500).json({ message: "Failed to fetch department performance summary." });
  }
};


export const getEmployeePerformance = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.FullName) {
      res.status(401).json({ message: "Unauthorized: User info missing." });
      return;
    }

    const userFullName = req.user.FullName.trim();
    const now = moment();
    const startOfweek = now.clone().startOf('week').toDate();
    const endOfweek = now.clone().endOf('week').toDate();

    const stats = await WorkPlan.aggregate([
      { $unwind: "$Tasks" },
      {
        $match: {
          WeekStartDate: { $gte: startOfweek, $lte: endOfweek },
          $or: [
            { "Tasks.AssignedTo": new RegExp(`^${userFullName}$`, "i") },
            { "Tasks.GroupLeader": new RegExp(`^${userFullName}$`, "i") }
          ]
        }
      },
      {
        $addFields: {
          week: { $isoWeek: "$WeekStartDate" }
        }
      },
      {
        $group: {
          _id: "$week",
          week: { $first: { $isoWeek: "$WeekStartDate" } },
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$Tasks.Status", "Completed"] }, 1, 0]
            }
          },
          overdueTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $lt: ["$Tasks.DueDate", new Date()] },
                    { $ne: ["$Tasks.Status", "Completed"] }
                  ]
                },
                1,
                0
              ]
            }
          },
          pendingTasks: {
            $sum: {
              $cond: [{ $eq: ["$Tasks.Status", "Pending"] }, 1, 0]
            }
          },
          inProgressTasks: {
            $sum: {
              $cond: [{ $eq: ["$Tasks.Status", "In Progress"] }, 1, 0]
            }
          },
          onHoldTasks: {
            $sum: {
              $cond: [{ $eq: ["$Tasks.Status", "On Hold"] }, 1, 0]
            }
          }
        }
      },
      { $sort: { week: 1 } }
    ]);

    res.json(stats);

  } catch (error) {
    console.error("getEmployeePerformance error:", error);
    res.status(500).json({ message: "Failed to fetch weekly employee performance." });
  }
};