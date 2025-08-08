import Site from "../_slurpi/db/Site.js";
import Message from "../_slurpi/db/Message.js";
import Movie from "../_slurpi/db/Movie.js";
import Show from "../_slurpi/db/Show.js";

export const getAdminDashboard = async (req, res) => {
  const site = await Site.findOne({ raw: true });
  const messages = await Message.findAll({ raw: true });
  const movies = await Movie.findAll({ raw: true });
  const shows = await Show.findAll({ raw: true });

  res.render("dashboard", { site, messages, movies, shows });
};
