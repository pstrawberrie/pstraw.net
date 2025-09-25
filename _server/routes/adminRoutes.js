import express from "express";
import {
  getAdminDashboard,
  getAdminTMDB,
  postDeleteItem,
} from "../controllers/adminController.js";
import {
  updateLastWatch,
  suppressLastWatch,
} from "../controllers/tmdbController.js";
const router = express.Router();

// Dashboard Routes
router.get("/", getAdminDashboard);
router.get("/tmdb", getAdminTMDB);

// API General Routes
router.post("/api/delete", postDeleteItem);

// API TMDB Routes
router.post("/api/tmdb/update-last-watch", updateLastWatch);
router.post("/api/tmdb/suppress-last-watch", suppressLastWatch);

export default router;
