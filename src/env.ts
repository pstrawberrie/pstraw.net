export const IS_DEV = import.meta.env.DEV;
export const SERVER_URL = IS_DEV ?
  `http://localhost:${import.meta.env.PUBLIC_SERVER_PORT}` : import.meta.env.PUBLIC_SERVER_URL;

// From DB
export const SITE_DATA = _SITE_DATA;