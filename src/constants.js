// Site Data
export const SITE = {
  TITLE: "pstraw.net",
  DESCRIPTION: "A personal web playground and archive.",
  VERSION: {
    CURRENT: 3.2,
    TITLE: "Chill Space",
  },
  NOTES_PER_PAGE: 10,
  MOVIES_PER_PAGE: 20,
};

// Tag Descriptions
export const TAG_DESCRIPTIONS = {
  DEV: "References, resources, and helpful information for general web development",
  SWG: "Star Wars Galaxies gameplay and development information",
  LINUX: "Info, guides, and resources for using linux",
  GENERAL: "Info about this site and other miscellaneous topics",
};

// Author Descriptions
export const AUTHOR_DESCRIPTIONS = {
  PSTRAW:
    "The person who made this site! He likes watching movies and shows, listening to music, playing games with friends, and making web stuff.",
  GHOST: "A ghost writer of the most mysterious origins...",
};

// All Links
// - used for utility functions ie. getPageMenuLinksFromPath
export const ALL_LINKS = [
  { path: "/", title: "Home" },
  {
    path: "/media",
    title: "Media",
    allTitle: "All Media",
    children: [
      { path: "/media/movies", title: "Movies" },
      { path: "/media/shows", title: "Shows" },
      { path: "/media/favorites", title: "My Favorites" },
    ],
  },
  {
    path: "/notes",
    title: "Notes",
    allTitle: "All Notes",
    children: [
      { path: "/notes/tags", title: "Tags" },
      { path: "/notes/authors", title: "Authors" },
    ],
  },
  { path: "/notes/thanks", title: "Thanks" },
];

// Nav Links
// - defines top navigation rendering
export const NAV_LINKS = [
  { path: "/notes", title: "Notes" },
  { path: "/media", title: "Media" },
];
