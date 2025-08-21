// @ts-check
import "dotenv/config";
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import Site from "./_slurpi/db/Site.js";
import Movie from "./_slurpi/db/Movie.js";
import Show from "./_slurpi/db/Show.js";

// Compile Movie Data for filters
const movieData = await Movie.findAll({ raw: true });
const movieGenres = [];
const movieYears = [];
const movieRatings = []; // ratings not always available!

movieData.forEach((m) => {
  const genres = JSON.parse(m.genres);
  genres.forEach((g) => {
    if (movieGenres.indexOf(g.name) === -1) movieGenres.push(g.name);
  });

  const year = new Date(m.release_date).getFullYear();
  if (movieYears.indexOf(year) === -1) movieYears.push(year);

  const rating = m?.rating;
  if (rating && movieRatings.indexOf(rating) === -1) movieRatings.push(rating);
});

// Compile Show Data for filters
const showData = await Show.findAll({ raw: true });
const showGenres = [];
const showYears = [];
const showRatings = []; // ratings not always available!

showData.forEach((s) => {
  const genres = JSON.parse(s.genres);
  genres.forEach((g) => {
    if (showGenres.indexOf(g.name) === -1) showGenres.push(g.name);
  });

  const year = new Date(s.first_air_date).getFullYear();
  if (showYears.indexOf(year) === -1) showYears.push(year);

  const rating = s?.rating;
  if (rating && showRatings.indexOf(rating) === -1) showRatings.push(rating);
});

// Get Site Data (last build etc.)
const siteData = await Site.findByPk(1);

export default defineConfig({
  integrations: [
    svelte(),
    sitemap(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "dark-plus" },
    }),
  ],
  site: process.env.PUBLIC_SITE_URL,
  base: "/",
  trailingSlash: "never",
  vite: {
    define: {
      _SITE_DATA: siteData,
      _MOVIE_DATA: {
        genres: movieGenres.sort(),
        years: movieYears.sort(),
        ratings: movieRatings.sort(),
      },
      _SHOW_DATA: {
        genres: showGenres.sort(),
        years: showYears.sort(),
        ratings: showRatings.sort(),
      },
      _MEDIA_DATA: {
        genres: [...new Set([...movieGenres, ...showGenres])].sort(),
        years: [...new Set([...movieYears, ...showYears])].sort(),
        ratings: [...new Set([...movieRatings, ...showRatings])].sort(),
      },
    },
  },
});
