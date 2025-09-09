import { GameDig } from "gamedig";
import cron from "node-cron";

export const gameServerStatus = {};

// Define Servers
const servers = [
  {
    name: "Valheim",
    type: "valheim",
    host: "pstraw.net",
    port: 2456,
    icon: "valheim.png",
  },
  {
    name: "7 Days To Die",
    type: "sdtd",
    host: "pstraw.net",
    port: 26900,
    icon: "7days.png",
  },
  // {
  //   name: "DOOM Zomboid",
  //   type: "projectzomboid",
  //   host: "pstraw.net",
  //   port: 16261,
  //   icon: "zomboid.png",
  // },
  // {
  //   name: "Failure Test",
  //   type: "minecraft",
  //   host: "pstraw.net",
  //   port: 123,
  //   icon: "valheim.png",
  // },
];

const queryGameServers = async () => {
  for (const server of servers) {
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
};

/**
 * CRON
 */
queryGameServers();

cron.schedule("*/10 * * * *", async () => {
  queryGameServers();
  console.log(`[${new Date()}] Game server cron finished`);
});
console.log("-> Game Server Cron Scheduled!");
