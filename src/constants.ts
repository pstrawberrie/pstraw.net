export const IS_DEV = import.meta.env.DEV;
export const SERVER_URL = IS_DEV ?
  `http://localhost:${import.meta.env.PUBLIC_SERVER_PORT}` : import.meta.env.PUBLIC_SERVER_URL;

// Site Data
export const SITE = {
  TITLE: 'pstraw.net',
  DESCRIPTION: 'A personal web playground and archive created for inspiration and exploration.',
  NOTES_PER_PAGE: 10,
  MOVIES_PER_PAGE: 20,
};

// Tag Descriptions
// - working list of tag descriptions
export const TAG_DESCRIPTIONS = {
  DEV: 'References, resources, and helpful information for general web development',
  SWG: 'Star Wars Galaxies gameplay and development information',
  LINUX: 'Info, guides, and resources for using linux',
  GENERAL: 'Info about this site and other miscellaneous topics'
}

// Author Descriptions
// - working list of author descriptions
export const AUTHOR_DESCRIPTIONS = {
  PSTRAW: 'The person who made this site! He likes watching movies and shows, listening to music, playing games with friends, and making web stuff.',
  EQSANCTUM: 'EQSanctum from eqsanctum.com'
}

// All Links
// - used for utility functions ie. getPageMenuLinksFromPath
export const ALL_LINKS = [
  { path: '/', title: 'Home' },
  {
    path: '/media', title: 'Media', allTitle: 'All Media', children: [
      { path: '/media/movies', title: 'Movies' },
      { path: '/media/shows', title: 'Shows' },
      { path: '/media/favorites', title: 'My Favorites' },
    ]
  },
  {
    path: '/notes', title: 'Notes', allTitle: 'All Notes', children: [
      { path: '/notes/tags', title: 'Tags' },
      { path: '/notes/authors', title: 'Authors' },
    ]
  },
  { path: '/notes/thanks', title: 'Thanks' },
];

// Nav Links
// - defines top navigation rendering
export const NAV_LINKS = [
  { path: '/notes', title: 'Notes' },
  { path: '/media', title: 'Media' },
];

// Footer Links
// - defines footer navigation rendering
export const FOOTER_LINKS = [
  {
    heading: 'Media',
    links: [
      { path: '/media', title: 'All Media' },
      { path: '/media/movies', title: 'Browse Movies' },
      { path: '/media/shows', title: 'Browse Shows' },
      { path: '/media/favorites', title: 'My Favorites' },
    ]
  },
  {
    heading: 'Notes',
    links: [
      { path: '/notes', title: 'All Notes' },
      { path: '/notes/tags', title: 'Notes by tag' },
      { path: '/notes/authors', title: 'Notes by author' },
    ]
  },
  {
    heading: 'General',
    links: [
      { path: '/notes/thanks', title: 'Thanks' },
    ]
  },
];

// From DB
export const SITE_DATA = _SITE_DATA;