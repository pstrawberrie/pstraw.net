import { GameDig } from "gamedig";

const servers = [
  { type: "valheim", host: "pstraw.net" },
  { type: "projectzomboid", host: "pstraw.net" },
];

export const getGameServers = async (req, res) => {
  try {
    console.log("GAME SERVER HIT"); //REMOVE

    GameDig.query({
      type: "valheim",
      host: "pstraw.net",
    })
      .then((state) => {
        res.json({ success: true, result: state });
      })
      .catch((error) => {
        console.log(`Server is offline: ${error}`);
        res.json({ error: "no response" });
      });
  } catch (err) {
    console.error(err);
    res.json({ error: err });
  }
};
