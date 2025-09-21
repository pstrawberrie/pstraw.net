import cron from "node-cron";
import { GameDig } from "gamedig";
import { servers } from "../data/gameServers.js";

export const gameServerStatus = {};

const queryGameServers = async () => {
  for (const server of servers) {
    if (server.active) {
      try {
        const state = await GameDig.query(server);
        // Use a unique key for each server based on its type and host
        const key = `${server.name}`;
        gameServerStatus[key] = {
          numplayers: state?.numplayers || 0,
          maxplayers: state?.maxplayers || 0,
          map: state?.map !== state?.name ? state?.map : undefined,
          icon: server.icon,
          updated: new Date(),
        };
        //   console.log(`Updated data for ${server.type} server at ${server.host}`);
      } catch (error) {
        console.error(
          `[${new Date()}] Gamedig query failed: ${server.type} @ ${server.host}: ${error.message}`,
        );
        // Store an error state or mark as offline in the cache
        const key = `${server.name}`;
        gameServerStatus[key] = {
          error: `Server is offline`,
          icon: server.icon,
          updated: new Date(),
        };
      }
    }
  }
};

/**
 * CRON
 */

// Initial Run
queryGameServers();

// Gamedig Cron
cron.schedule("*/10 * * * *", async () => {
  queryGameServers();
  console.log(`[${new Date()}] Gamedig cron finished`);
});
console.log("-> Gamedig Cron Scheduled!");
