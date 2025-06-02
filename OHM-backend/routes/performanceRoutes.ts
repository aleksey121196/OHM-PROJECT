import express from "express";
import { getDepartmentPerformanceSummary, getEmployeePerformance } from "../controllers/performanceController";
import { authenticateJWT } from "../Middleware/auth.middleware";
const router = express.Router();

// Route to get performance summary for all departments
router.get("/departments-summary", authenticateJWT, getDepartmentPerformanceSummary);

// Route to get performance summary for the currently authenticated employee
router.get("/employee-summary", authenticateJWT, getEmployeePerformance);

export default router;
