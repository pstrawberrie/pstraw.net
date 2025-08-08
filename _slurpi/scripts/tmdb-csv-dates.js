import fs from "node:fs";
import { resolveFromRoot } from "../../path.js";
import csvToJson from "convert-csv-to-json";
import Movie from "../db/Movie.js";
import Show from "../db/Show.js";

function convertCSV() {
  return new Promise((resolve, reject) => {
    try {
      let json = csvToJson
        .fieldDelimiter(",")
        .supportQuotedField(true)
        .getJsonFromCsv(resolveFromRoot("_slurpi/data/tmdb-favorites.csv"));
      const output = [];

      for (let i = 0; i < json.length; i++) {
        output.push(json[i]);
      }

      fs.writeFileSync(
        resolveFromRoot("_slurpi/data/tmdb-favorites.json"),
        JSON.stringify(output),
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

/* Set Favorites Dates */
(async () => {
  await convertCSV();

  const dateData = JSON.parse(
    fs.readFileSync(
      resolveFromRoot("_slurpi/data/tmdb-favorites.json"),
      "utf8",
    ),
  );
  const movies = await Movie.findAll();
  const shows = await Show.findAll();
  const total = movies.length + shows.length;
  const errors = [];

  dateData.forEach(async (i, idx) => {
    const id = i.TMDbID;
    const date = new Date(i.DateRated);
    const model = i.Type === "tv" ? Show : Movie;

    const item = await model.findByPk(id);

    if (item) {
      // Some funky stuff to change 'createdAt':
      item.changed("createdAt", true);
      item.set("createdAt", date, { raw: true });
      await item.save({ silent: true, fields: ["createdAt"] });
      console.log(`updated ${i.Name} (${i.Type}): ${idx}/${total}`);
    }
  });
})();

convertCSV();
