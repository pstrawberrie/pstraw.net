import { gameServerStatus } from "../crons/gamedigCron.js";

// GET game server status
export const getGameServerCachedStatus = async (req, res) => {
  res.json({ success: true, result: gameServerStatus });
};
