import express from "express";
import {
  getSearchStatus,
  postSearch,
  postMediaFilter,
} from "../controllers/searchController.js";
import { getGameServers } from "../controllers/gameServerController.js";
import { postMessage } from "../controllers/messageController.js";
const router = express.Router();

// Search Routes
router.get("/search", getSearchStatus);
router.post("/search", postSearch);
router.post("/filter/media", postMediaFilter);

// Message Routes
router.post("/contact", postMessage);

// Game Server Routes
router.get("/game-servers", getGameServers);

export default router;
