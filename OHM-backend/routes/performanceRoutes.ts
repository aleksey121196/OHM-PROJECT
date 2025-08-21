import express from "express";
import { getDepartmentPerformanceSummary, getEmployeePerformance } from "../controllers/performanceController";
import { authenticateJWT } from "../Middleware/auth.middleware";
const router = express.Router();

router.get("/departments-summary", authenticateJWT, getDepartmentPerformanceSummary);

router.get("/employee-summary", authenticateJWT, getEmployeePerformance);

export default router;
