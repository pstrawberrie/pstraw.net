export const IS_DEV = import.meta.env.DEV;
export const SERVER_URL = IS_DEV ?
  `http://localhost:${import.meta.env.PUBLIC_SERVER_PORT}` : import.meta.env.PUBLIC_SERVER_URL;

export const SITE = {
  TITLE: 'pstraw.net',
  LOGO_TITLE: 'pstraw',
  DESCRIPTION: 'it\'s pstrawberrie\'s web site!',
  NOTES_PER_PAGE: 10,
  MOVIES_PER_PAGE: 20,
};

export const PAGE_COLORS = [
  { path: '/', },
  { path: '/media', color: "secondary" },
  { path: '/notes', color: "quaternary" },
  { path: '/about', color: "tertiary" },
];

export const ALL_LINKS = [
  { path: '/', title: 'Home' },
  {
    path: '/media', title: 'Media', allTitle: 'Favorites', children: [
      { path: '/media/movies', title: 'Movies' },
      { path: '/media/shows', title: 'Shows' },
    ]
  },
  {
    path: '/notes', title: 'Notes', allTitle: 'All Notes', children: [
      { path: '/notes/tags', title: 'Tags' },
      { path: '/notes/authors', title: 'Authors' },
    ]
  },
  { path: '/search', title: 'Search' },
  { path: '/about', title: 'About' },
  { path: '/contact', title: 'Contact' },
];

export const NAV_LINKS = [
  { path: '/', title: 'Home' },
  { path: '/notes', title: 'Notes' },
  { path: '/media', title: 'Media' },
];

export const FOOTER_LINKS = [
  {
    heading: 'Media',
    links: [
      { path: '/media', title: 'Favorites' },
      { path: '/media/movies', title: 'Movies' },
      { path: '/media/shows', title: 'Shows' },
    ]
  },
  {
    heading: 'Notes',
    links: [
      { path: '/notes', title: 'All Notes' },
      { path: '/notes/tags', title: 'Tags' },
      { path: '/notes/authors', title: 'Authors' },
    ]
  },
  {
    heading: 'Site',
    links: [
      { path: '/', title: 'Home' },
      { path: '/about', title: 'About' },
    ]
  },
];

// From DB
export const SITE_DATA = _SITE_DATA;