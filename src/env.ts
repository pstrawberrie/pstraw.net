export const IS_DEV = import.meta.env.DEV;
export const SERVER_URL = IS_DEV
  ? `http://localhost:${import.meta.env.PUBLIC_SERVER_PORT}`
  : import.meta.env.PUBLIC_SERVER_URL;

// From DB
export const SITE_DATA = _SITE_DATA;
export const MEDIA_DATA = _MEDIA_DATA;
export const MOVIE_DATA = _MOVIE_DATA;
export const SHOW_DATA = _SHOW_DATA;
