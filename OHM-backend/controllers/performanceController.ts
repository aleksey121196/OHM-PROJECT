import { Request, Response } from "express";
import WorkPlan from "../models/WorkPlan";

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

// Employee-level performance summary
export const getEmployeePerformance = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.FullName) {
      res.status(401).json({ message: "Unauthorized: User info missing." });
      return;
    }

    const userFullName = req.user.FullName.trim();
    const today = new Date();

    const stats = await WorkPlan.aggregate([
      { $unwind: "$Tasks" },
      {
        $match: {
          $or: [
            { "Tasks.AssignedTo": new RegExp(`^${userFullName}$`, "i") },
            { "Tasks.GroupLeader": new RegExp(`^${userFullName}$`, "i") }
          ]
        }
      },
      {
        $group: {
          _id: null,
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
      }
    ]);

    const result = stats[0] || {
      totalTasks: 0,
      completedTasks: 0,
      overdueTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      onHoldTasks: 0,
    };

    res.json(result);

  } catch (error) {
    console.error("getEmployeePerformance error:", error);
    res.status(500).json({ message: "Failed to fetch employee performance." });
  }
};
