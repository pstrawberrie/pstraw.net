import fs from "node:fs";
import matter from "gray-matter";
import { resolveFromRoot } from "../../path.js";
import Movie from "../../_slurpi/db/Movie.js";
import Show from "../../_slurpi/db/Show.js";

/* Search Data Setup */
const searchResultsPerPage = 10;
const allData = [];

/* Remove Articles (copied from src/util.ts) */
function removeArticles(str) {
  const articles = ["a ", "an ", "the "]; // Note the trailing spaces
  let lowerStr = str.toLowerCase();

  for (const article of articles) {
    if (lowerStr.startsWith(article)) {
      return str.substring(article.length).trim(); // Remove article and trim
    }
  }
  return str;
}

(async () => {
  // Get DB Data
  const movies = await Movie.findAll({ raw: true });
  const shows = await Show.findAll({ raw: true });

  movies.forEach((m) => allData.push({ collection: "movies", ...m }));
  shows.forEach((s) => allData.push({ collection: "shows", ...s }));

  // Get Notes Data
  const notesDir = resolveFromRoot("src/content/notes");
  const noteFiles = fs.readdirSync(notesDir);

  for (let i = 0; i < noteFiles.length; i++) {
    const filePath = resolveFromRoot(`${notesDir}/${noteFiles[i]}`);
    const slug = noteFiles[i].replace(".mdx", "");

    try {
      const markdownContent = fs.readFileSync(filePath, "utf-8");
      const { data: metadata } = matter(markdownContent);

      // only push published stuff
      if (metadata.published)
        allData.push({ collection: "notes", id: slug, slug, ...metadata });
    } catch (error) {
      console.error("Error processing Markdown file:", error.message);
    }
  }

  // Sort Data
  allData.sort((a, b) => {
    // return most recent first
    // const aDate = a?.createdAt || a?.updated || a?.date || a?.title;
    // const bDate = b?.createdAt || b?.updated || b?.date || b?.title;
    // return new Date(bDate) - new Date(aDate);

    // return title-sorted dates
    const aTitle = removeArticles(a?.title);
    const bTitle = removeArticles(b?.title);
    return aTitle.localeCompare(bTitle);
  });

  console.log("-> Search Data in Memory!");
})();

/* GET Search Status */
export const getSearchStatus = (req, res) =>
  res.json({ online: true, items: allData.length, allData });

/* POST Search */
export const postSearch = async (req, res) => {
  try {
    const { query, page = 1 } = req.body;
    if (query.length < 2)
      return res.json({ info: "insufficient character length" });

    const lowerQuery = "" + query.trim().toLowerCase();

    // Filter all matches
    const matchedResults = allData.filter((item) =>
      item.title.toLowerCase().includes(lowerQuery),
    );

    // Check for exact match
    let exactMatches = [];
    matchedResults.forEach((r) => {
      if (r.title.toLowerCase() === lowerQuery) exactMatches.push(r);
    });

    // Matches totals & pages
    const total = matchedResults.length;
    const totalPages = Math.ceil(total / searchResultsPerPage);

    // Paginated results
    const results = matchedResults
      .slice((page - 1) * searchResultsPerPage, page * searchResultsPerPage)
      .map((r) => r);

    // Send JSON
    const finalJson = { results, total, totalPages };
    if (exactMatches.length) finalJson.exactMatches = exactMatches;

    res.json(finalJson);
  } catch (err) {
    console.error(err);
    res.json({ error: "Search Error" });
  }
};

/* POST Media Filter */
export const postMediaFilter = async (req, res) => {
  try {
    const { filter, page = 1 } = req.body;
    const { type, genre, year, rating } = filter;

    if (!type || !genre || !year || !rating) {
      res.json({ error: "Bad filter options - try again" });
    }

    const results = allData
      .filter((i) =>
        type === "all"
          ? i.collection === "movies" || i.collection === "shows"
          : i.collection === type,
      )
      .filter((i) => (rating === "all" ? true : i.rating === rating))
      .filter((i) =>
        year === "all"
          ? true
          : i?.release_date?.split("-")[0] === year ||
            i?.first_air_date?.split("-")[0] === year,
      )
      .filter((i) =>
        genre === "all"
          ? true
          : JSON.parse(i.genres).some((o) => o.name === genre),
      );

    // @TODO: left off here, return new filter options based on what's available in results
    // const newFilterOptions = {filterType: type, genreOptions: [], yearOptions: [], ratingOptions: []};
    // results.forEach(r => {

    // });

    res.json({ success: true, results });

    // Filter all matches
    // const matchedResults = allData.filter((item) =>
    //   item.title.toLowerCase().includes(lowerQuery),
    // );

    // Matches totals & pages
    // const total = matchedResults.length;
    // const totalPages = Math.ceil(total / searchResultsPerPage);

    // Paginated results
    // const results = matchedResults
    //   .slice((page - 1) * searchResultsPerPage, page * searchResultsPerPage)
    //   .map((r) => r);

    // Send JSON
    // const finalJson = { results, total, totalPages };
    // res.json(finalJson);
  } catch (err) {
    console.error(err);
    res.json({ error: "Search Error" });
  }
};
