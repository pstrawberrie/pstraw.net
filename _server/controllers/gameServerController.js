import { GameDig } from "gamedig";

const servers = [
  { type: "valheim", host: "pstraw.net" },
  { type: "projectzomboid", host: "pstraw.net" },
  { type: "farts", host: "asfzzdftest.com" },
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
            output.push(r);
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
