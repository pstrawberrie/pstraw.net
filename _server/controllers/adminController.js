import Site from "../../_slurpi/db/Site.js";
import Message from "../../_slurpi/db/Message.js";
import Movie from "../../_slurpi/db/Movie.js";
import Show from "../../_slurpi/db/Show.js";

/* Util getModel */
const getModel = (type) => {
  switch (type) {
    case "message":
      return Message;
    case "movie":
      return Movie;
    case "show":
      return Show;
  }
};

// GET Dashboard
export const getAdminDashboard = async (req, res) => {
  const site = await Site.findOne({ raw: true });
  const messages = await Message.findAll({ raw: true });
  const movies = await Movie.findAll({ raw: true });
  const shows = await Show.findAll({ raw: true });

  res.render("dashboard", { site, messages, movies, shows });
};

// GET TMDB
export const getAdminTMDB = async (req, res) => {
  const movies = await Movie.findAll({ raw: true });
  const shows = await Show.findAll({ raw: true });

  movies.sort((a, b) => {
    const aDate = a?.last_watch;
    const bDate = b?.last_watch;
    return new Date(bDate) - new Date(aDate);
  });

  shows.sort((a, b) => {
    const aDate = a?.last_watch;
    const bDate = b?.last_watch;
    return new Date(bDate) - new Date(aDate);
  });

  res.render("tmdb", { movies, shows });
};

// POST Delete
export const postDeleteItem = async (req, res) => {
  try {
    const { type, id } = req.body;
    const model = getModel(type);
    const item = await model.findByPk(id);

    if (item) {
      await item.destroy();
      const total = await model.count();
      res.json({ success: true, total });
    } else {
      res.json({ error: `Couldn't find ${type} width ID "${id}"` });
    }
  } catch (err) {
    res.json({ error: err });
  }
};
