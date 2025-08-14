import express from "express";
import {
  getAdminDashboard,
  postDeleteItem,
} from "../controllers/adminController.js";
const router = express.Router();

// Dashboard Routes
router.get("/", getAdminDashboard);

// API Routes
router.post("/api/delete", postDeleteItem);

export default router;
