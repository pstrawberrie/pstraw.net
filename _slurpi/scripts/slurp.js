/* Slurp TMDB! */
import 'dotenv/config';
import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { Readable } from 'node:stream';
import { joinFromRoot } from '../../path.js';
import { optimizeImages } from '../optimize-images.js';
import Show from '../db/Show.js';
import Movie from '../db/Movie.js';

// Credentials
const TMDBaccessToken = process.env.TMDB_ACCESS_TOKEN;
const TMDBaccountId = process.env.TMDB_ACCOUNT_ID;

// TMDB Fetch Helper
async function tmdbFetch(path) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDBaccessToken}`
    }
  };

  try {
    const response = await fetch(path, options);
    if (!response.ok) {
      console.log(response);
      throw new Error('tmdbFetch() response fetch not ok');
    };

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('error with tmdbFetch()', error);
  }
}

/**
 * Build Favorites Array
 */
function buildTMDBFavoritesArray(category) {
  const cat = category !== 'tv' ? 'movies' : 'tv';

  let currentPage = 1;
  const url = () => `https://api.themoviedb.org/3/account/${TMDBaccountId}/favorite/${cat}?language=en-US&page=${currentPage}&sort_by=created_at.asc`;

  return new Promise(async (resolve, reject) => {
    try {
      console.log(`-> building ${cat} item favorites array...`);

      const initialData = await tmdbFetch(url());
      const totalPages = initialData.total_pages;
      const favorites = [];

      initialData.results.forEach(r => favorites.push(r.id));

      // If total pages > 1, get all pages
      if (totalPages > currentPage) {
        currentPage++;

        for (let i = currentPage; i <= totalPages; i++) {
          const pageResults = await tmdbFetch(url());
          pageResults.results.forEach(r => favorites.push(r.id));

          if (i === totalPages) {
            console.log(`--> ${cat} favorites array built!`);
            return resolve(favorites);
          };
          currentPage++;
        }
      }
    } catch (err) {
      console.error(`error building ${cat} favorites array:`);
      reject(err);
    }
  });
}

/**
 * Save Details
 */
function saveTMDBDetails(category, arr) {
  const cat = category !== 'tv' ? 'movie' : 'tv';
  const append = category !== 'tv' ? 'release_dates' : 'content_ratings';
  const model = category !== 'tv' ? Movie : Show;
  const url = (id) => `https://api.themoviedb.org/3/${cat}/${id}?language=en-US&append_to_response=${append}`;

  return new Promise(async (resolve, reject) => {
    try {
      console.log(`---> saving ${cat} details started (${arr.length} total)...`);

      async function saveImage(fetchUrl, filePath) {
        const response = await fetch(fetchUrl);
        const stream = Readable.fromWeb(response.body);
        await writeFile(filePath, stream);
      }

      for (let i = 0; i < arr.length; i++) {
        const dbItem = await model.findByPk(arr[i]);
        const imagePath = joinFromRoot(`_slurpi/images/tmdb/${arr[i]}.jpg`);
        const imageExists = await existsSync(imagePath);

        if (!dbItem) {
          // If new item
          console.log(`---> saving ${cat} item ${i + 1}/${arr.length}...`);

          const details = await tmdbFetch(url(arr[i]));
          const data = {
            poster_path: details.poster_path,
            adult: details.adult,
            genres: details.genres,
            id: details.id,
            overview: details.overview,
            original_language: details.original_language,
          };

          if (cat === 'tv') {
            data.title = details.name;
            data.first_air_date = details.first_air_date;
            data.episode_run_time = details.episode_run_time;
            data.number_of_episodes = details.number_of_episodes;
            data.number_of_seasons = details.number_of_seasons;
            data.in_production = details.in_production;
            data.rating = details?.content_ratings?.results?.filter(c => c.iso_3166_1 === 'US')[0]?.rating || "Unknown";
          }

          if (cat === 'movie') {
            data.title = details.title;
            data.release_date = details.release_date;
            data.runtime = details.runtime;
            data.rating = details?.release_dates?.results?.filter(c => c.iso_3166_1 === 'US')[0]?.release_dates?.filter(c => c.certification !== "")[0]?.certification || "Unknown";
          }

          // save item data
          await model.create(data);

          if (!imageExists) {
            await saveImage(`https://image.tmdb.org/t/p/w200/${details.poster_path}`, imagePath);
          }
        } else {
          if (!imageExists) {
            await saveImage(`https://image.tmdb.org/t/p/w200/${dbItem.poster_path}`, imagePath);
          }
        }

        if (i + 1 === arr.length) {
          console.log(`---> saving ${cat} items finished!`);
          resolve();
        }
      }
    } catch (err) {
      console.error(`error saving ${cat} details:`);
      reject(err);
    }
  });
}

// Run!
(async () => {
  console.log('------------');
  console.log(`> TMDB tv slurp started...`);
  let tvFavorites = await buildTMDBFavoritesArray('tv');
  await saveTMDBDetails('tv', tvFavorites);
  tvFavorites = null;

  console.log('------------');
  console.log(`> TMDB movie slurp started...`);
  let movieFavorites = await buildTMDBFavoritesArray('movies');
  await saveTMDBDetails('movie', movieFavorites);
  movieFavorites = null;

  console.log('------------');
  await optimizeImages('_slurpi/images/tmdb', 'public/images/tmdb');
})();