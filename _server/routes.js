import express from "express";
import { getSearchStatus, postSearch } from "./searchController.js";
import { postMessage } from "./messageController.js";
import { getAdminDashboard } from "./adminController.js";
const router = express.Router();

// Search Routes
router.get("/search", getSearchStatus);
router.post("/search", postSearch);

// Message Routes
router.post("/contact", postMessage);

// Admin Routes
router.get("/", getAdminDashboard);

export default router;
