import { GameDig } from "gamedig";
import cron from "node-cron";

// Define Servers
const servers = [
  {
    name: "DOOM Valheim",
    type: "valheim",
    host: "pstraw.net",
    port: 2456,
    icon: "valheim.png",
  },
  {
    name: "DOOM Zomboid",
    type: "projectzomboid",
    host: "pstraw.net",
    port: 16261,
    icon: "zomboid.png",
  },
  // {
  //   name: "Failure Test",
  //   type: "minecraft",
  //   host: "pstraw.net",
  //   port: 123,
  //   icon: "valheim.png",
  // },
];

// @TODO: THIS IS BROKEN!!!!

// Set Up in-memory cache
const cachedGameServers = {};

const queryGameServers = async () => {
  console.log("Querying Game Servers...");
  for (const server of servers) {
    try {
      const state = await GameDig.query(server);
      // Use a unique key for each server based on its type and host
      const key = `${server.name}`;
      cachedGameServers[key] = {
        numplayers: state?.numplayers || 0,
        maxplayers: state?.maxplayers || 0,
        map: state?.map !== state?.name ? state?.map : undefined,
        icon: server.icon,
        updated: new Date(),
      };
      console.log(`Updated data for ${server.type} server at ${server.host}`);
    } catch (error) {
      console.error(
        `Failed to query server ${server.type} at ${server.host}: ${error.message}`,
      );
      // Store an error state or mark as offline in the cache
      const key = `${server.name}`;
      cachedGameServers[key] = {
        error: `Server is offline or unreachable.`,
        icon: server.icon,
        lastAttempted: new Date(),
      };
    }
  }
};

// Schedule Cron
cron.schedule("*/5 * * * *", queryGameServers);

// Run Query on start
await queryGameServers();

export const getGameServers = async (req, res) => {
  res.json(cachedGameServers);
};
