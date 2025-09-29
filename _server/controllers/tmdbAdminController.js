import Movie from "../../_slurpi/db/Movie.js";
import Show from "../../_slurpi/db/Show.js";

// Update Last Watch
export const updateLastWatch = async (req, res) => {
  try {
    const { type, id, date = new Date() } = req.body;
    if (!id) throw new Error("no id provided");
    if (type !== "movie" && type !== "show")
      throw new Error(`bad type provided: ${type}`);

    const model = type === "movie" ? Movie : Show;
    const media = await model.findByPk(id);

    if (media) {
      const updatedMedia = await media.update({ last_watch: date });
      res.json({ success: true, media: updatedMedia });
    } else {
      res.json({ error: `No ${type} media found with id ${id}` });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Suppress Last Watch Media (bool switch)
export const suppressLastWatch = async (req, res) => {
  try {
    const { type, id } = req.body;
    if (!id) throw new Error("no id provided");
    console.log("got id", type);
    if (type !== "movie" && type !== "show")
      throw new Error(`bad type provided: ${type}`);

    const model = type === "movie" ? Movie : Show;
    const media = await model.findByPk(id);

    if (media) {
      const updatedMedia = await media.update({
        last_watch_suppressed: !media.last_watch_suppressed,
      });
      res.json({ success: true, media: updatedMedia });
    } else {
      res.json({ error: `No ${type} media found with id ${id}` });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
