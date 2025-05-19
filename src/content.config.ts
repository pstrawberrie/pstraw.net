import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";
import Movie from "@slurpi/db/Movie.js";
import Show from "@slurpi/db/Show.js";

// Notes Collection @ local .md files
const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    published: z.boolean(),
    updated: z.date().optional(),
    description: z.string(),
    authors: z.array(z.string()),
    image: z.object({
      pathname: z.string(),
      alt: z.string()
    }).optional(),
    tags: z.array(z.string()),
  })
});

// Friends Collection @ local .md files
const friends = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/friends" }),
  schema: z.object({
    title: z.string(),
    aka: z.string().optional(),
    description: z.string(),
    tags: z.array(z.string()),
    images: z.array(z.string()),
  })
});

/* Movies Collection */
const movies = defineCollection({
  loader: async () => {
    const data = await Movie.findAll({ order: [['title', 'ASC']], raw: true })
      .catch(err => console.error('Error getting Movies data from slurpi:', err));

    return data.map((item) => {
      const { id, ...itemData } = item;
      return {
        id: `${item.id}`,
        ...itemData
      };
    });
  },
  schema: z.object({
    adult: z.number(),
    genres: z.string(),//JSON
    original_language: z.string(),
    overview: z.string(),
    release_date: z.string(),
    title: z.string(),
    runtime: z.number(),
    rating: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

/* Shows Collection */
const shows = defineCollection({
  loader: async () => {
    const data = await Show.findAll({ order: [['title', 'ASC']], raw: true })
      .catch(err => console.error('Error getting Shows data from slurpi:', err));

    return data.map((item) => {
      const { id, ...itemData } = item;
      return {
        id: `${item.id}`,
        ...itemData
      };
    });
  },
  schema: z.object({
    adult: z.number(),
    genres: z.string(),//JSON/Obj
    original_language: z.string(),
    overview: z.string(),
    first_air_date: z.string(),
    title: z.string(),
    episode_run_time: z.string(),//JSON/Array
    number_of_episodes: z.number(),
    number_of_seasons: z.number(),
    in_production: z.number(),//Boolean Number
    rating: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

// EXPORT ALL COLLECTIONS
export const collections = { notes, friends, movies, shows };
