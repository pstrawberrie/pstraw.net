import { GameDig } from "gamedig";

const servers = [
  {
    type: "valheim",
    host: "pstraw.net",
    connect: "pstraw.net:2456",
    name: "DOOM Valheim",
  },
  {
    type: "projectzomboid",
    host: "pstraw.net",
    connect: "pstraw.net:16261",
    name: "DOOM Zomboid",
  },
  {
    type: "farts",
    host: "asfzzdftest.com",
    connect: "pstraw.net:123123",
    name: "Gamedig Test",
  },
];

export const getGameServers = async (req, res) => {
  try {
    console.log("GAME SERVER HIT"); //REMOVE

    const queries = [];
    const output = [];

    servers.forEach((s) => {
      queries.push(GameDig.query(s));
    });

    Promise.allSettled(queries)
      .then((result) => {
        result.forEach((r) => {
          if (r.status === "fulfilled") {
            output.push({ online: true, ...r.value });
          } else {
            output.push({ online: false, ...r.value });
          }
        });

        res.json({ success: true, result: output });
      })
      .catch((error) => {
        console.log(`Query failed: ${error}`);
        res.json({ error: "failed" });
      });
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
};
