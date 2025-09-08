import express from "express";
import {
  postSearch,
  postMediaFilter,
} from "../controllers/searchController.js";
import { postMessage } from "../controllers/messageController.js";
const router = express.Router();

// Search Routes
router.post("/search", postSearch);
router.post("/filter/media", postMediaFilter);

// Message Routes
router.post("/contact", postMessage);

export default router;
