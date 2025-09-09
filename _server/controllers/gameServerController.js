import { gameServerStatus } from "../crons/gameServerCron.js";

// GET game server status
export const getGameServerCachedStatus = async (req, res) => {
  res.json({ success: true, result: gameServerStatus });
};
