export const IS_DEV = import.meta.env.DEV;
export const SERVER_URL = IS_DEV ?
  `http://localhost:${import.meta.env.PUBLIC_SERVER_PORT}` : import.meta.env.PUBLIC_SERVER_URL;

export const SITE = {
  TITLE: 'pstraw.net',
  DESCRIPTION: 'it\'s pstrawberrie\'s web site!',
  NOTES_PER_PAGE: 10,
  MOVIES_PER_PAGE: 20,
};

export const ALL_LINKS = [
  { path: '/', title: 'Home' },
  {
    path: '/media', title: 'Media', allTitle: 'All Media', children: [
      { path: '/media/movies', title: 'Movies' },
      { path: '/media/shows', title: 'Shows' },
      { path: '/media/favorites', title: 'Favorites' },
    ]
  },
  {
    path: '/notes', title: 'Notes', allTitle: 'All Notes', children: [
      { path: '/notes/tags', title: 'Tags' },
      { path: '/notes/authors', title: 'Authors' },
    ]
  },
  { path: '/friends', title: 'Friends' },
  { path: '/thanks', title: 'Thanks' },
];

export const NAV_LINKS = [
  { path: '/', title: '🏠 Home' },
  { path: '/notes', title: '📋 Notes' },
  { path: '/media', title: '📀 Media' },
  { path: '/friends', title: '🍺 Friends' },
  { path: '/thanks', title: '❤️ Thanks' },
  { path: '/about', title: 'ℹ️ About' },
];

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
      { path: '/friends', title: 'Friends' },
      { path: '/thanks', title: 'Thanks' },
        { path: '/about', title: 'About' },
    ]
  },
];

// From DB
export const SITE_DATA = _SITE_DATA;