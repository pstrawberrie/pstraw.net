import fs from 'node:fs';
import matter from 'gray-matter';
import { resolveFromRoot } from '../path.js';
import Site from '../slurpi/db/Site.js';
import Movie from '../slurpi/db/Movie.js';
import Show from '../slurpi/db/Show.js';

const isDev = process.env.NODE_ENV !== 'production';
const SEARCH_HISTORY_MAX = 20;

/* Search Data Setup */
const searchResultsPerPage = 20;
const allData = [];

(async () => {
  // Get DB Data
  const movies = await Movie.findAll({ raw: true });
  const shows = await Show.findAll({ raw: true });

  movies.forEach(m => allData.push({ collection: 'movies', ...m }));
  shows.forEach(s => allData.push({ collection: 'shows', ...s }));

  // Get Notes Data
  const notesDir = resolveFromRoot('src/content/notes');
  const noteFiles = fs.readdirSync(notesDir);

  for (let i = 0; i < noteFiles.length; i++) {
    const filePath = resolveFromRoot(`src/content/notes/${noteFiles[i]}`);
    const slug = noteFiles[i].replace('.mdx', '');

    try {
      const markdownContent = fs.readFileSync(filePath, 'utf-8');
      const { data: metadata } = matter(markdownContent);
      if (isDev || metadata.published) allData.push({ collection: 'notes', id: slug, slug, ...metadata });
    } catch (error) {
      console.error("Error processing Markdown file:", error.message);
    }
  }

  allData.sort((a, b) => {
    const aDate = a?.createdAt || a?.updated || a?.date;
    const bDate = b?.createdAt || b?.updated || b?.date;
    return new Date(bDate) - new Date(aDate);
  });

  console.log('-> Search Data in Memory!');
})();

/* GET Search Status */
export const getSearchStatus = (req, res) => res.json({ online: true, items: allData.length, allData });

/* GET Search History */
export const getSearchHistory = async (req, res) => {
  try {
    const siteData = await Site.findByPk(1, { raw: true });
    res.json(siteData.search_history || []);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Error Getting Search History' });
  }
};

/* POST Search */
export const postSearch = async (req, res) => {
  try {
    const { query, page = 1 } = req.body;
    if (query.length < 2) return res.json({ info: 'insufficient character length' });

    const lowerQuery = query.trim().toLowerCase();

    // Filter all matches
    const matchedResults = allData.filter(item => item.title.toLowerCase().includes(lowerQuery));

    // Check for exact match
    let exactMatches = [];
    matchedResults.forEach(r => {
      if (r.title.toLowerCase() === lowerQuery) exactMatches.push(r);
    });

    // Matches totals & pages
    const total = matchedResults.length;
    const totalPages = Math.ceil(total / searchResultsPerPage);

    // Paginated results
    const results = matchedResults
      .slice((page - 1) * searchResultsPerPage, page * searchResultsPerPage)
      .map(r => r);

    // Update search history if results were found
    const siteData = await Site.findByPk(1);
    let searchHistory = siteData.search_history || [];

    if (total) {
      let exists = false;
      searchHistory.forEach(h => { if (h.query === lowerQuery) exists = true; });

      if (!exists) {
        if (searchHistory.length > SEARCH_HISTORY_MAX - 1) searchHistory.pop();
        searchHistory = [{ query: lowerQuery, results: total }, ...searchHistory];
        siteData.search_history = searchHistory;
        await siteData.save();
      }
    }

    // Send JSON
    const finalJson = { results, total, totalPages, searchHistory };
    if (exactMatches.length) finalJson.exactMatches = exactMatches;

    res.json(finalJson);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Search Error' });
  }
};