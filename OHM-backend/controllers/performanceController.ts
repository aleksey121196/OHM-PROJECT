import { Request, Response } from "express";
import WorkPlan from "../models/WorkPlan";
import moment from "moment";

// Department-level performance summary
export const getDepartmentPerformanceSummary = async (req: Request, res: Response) => {
  try {
    const today = new Date();

    const summary = await WorkPlan.aggregate([
      { $unwind: "$Tasks" },
      {
        $group: {
          _id: "$Department",
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
                    { $lt: ["$Tasks.DueDate", today] },
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
      { $sort: { _id: 1 } }
    ]);

    // Rename _id to departmentName for frontend clarity
    const result = summary.map(item => ({
      departmentName: item._id,
      ...item,
      _id: undefined
    }));

    res.json(result);
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
    const startOfMonth = now.clone().startOf('month').toDate();
    const endOfMonth = now.clone().endOf('month').toDate();

    const stats = await WorkPlan.aggregate([
      { $unwind: "$Tasks" },
      {
        $match: {
          WeekStartDate: { $gte: startOfMonth, $lte: endOfMonth },
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