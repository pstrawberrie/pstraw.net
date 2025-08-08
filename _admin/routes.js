import express from "express";
import { getAdminDashboard } from "./adminController.js";
const router = express.Router();

// Admin Routes
router.get("/", getAdminDashboard);

export default router;
