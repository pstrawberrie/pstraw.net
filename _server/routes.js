import express from "express";
import { getSearchStatus, postSearch } from "./searchController.js";
import { postMessage } from "./messageController.js";
import { getMessages } from "./testController.js"; // REMOVE TESTING
const router = express.Router();

// Search Routes
router.get("/search", getSearchStatus);
router.post("/search", postSearch);

// Message Routes
router.post("/contact", postMessage);

// Test Routes
router.get("/messages", getMessages);

export default router;
