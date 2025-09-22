import Movie from "../../_slurpi/db/Movie.js";
import Show from "../../_slurpi/db/Show.js";

// Refresh Media
export const refreshMedia = async (req, res) => {
  try {
    const { type, id, date = new Date() } = req.body;
    if (!id) throw new Error("no id provided");
    if (
      !type ||
      type?.toLowerCase() !== "movie" ||
      type?.toLowerCase() !== "show"
    ) {
      throw new Error(`bad type provided: ${type}`);
    }

    const model = type === "movie" ? Movie : Show;
    const media = await model.findByPk(id);

    if (media) {
      const updatedMedia = await media.update({ last_watch: date });
      res.json({ success: true, media: updatedMedia });
    } else {
      res.json({ error: `No ${type} media found with id ${id}` });
    }
  } catch (err) {
    res.json({ error: err });
  }
};
