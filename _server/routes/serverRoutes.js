import express from "express";
import {
  getSearchStatus,
  postSearch,
} from "../controllers/searchController.js";
import { postMessage } from "../controllers/messageController.js";
const router = express.Router();

// Search Routes
router.get("/search", getSearchStatus);
router.post("/search", postSearch);

// Message Routes
router.post("/contact", postMessage);

export default router;
