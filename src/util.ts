import { ALL_LINKS, TAG_DESCRIPTIONS, AUTHOR_DESCRIPTIONS } from "@constants";

/**
 * Environment
 */
export const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * Format Date
 */
type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(
  date: string,
  dateStyle: DateStyle = "long",
  locales = "en",
) {
  const dateToFormat = new Date(date);
  const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return dateFormatter.format(dateToFormat);
}

/**
 * Date Relative Time
 */
export function getRelativeTime(date: Date) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const timeMs = new Date(date).getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];
  const units = ["second", "minute", "hour", "day", "week", "month", "year"];

  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  );
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

/**
 * Minutes to Hours
 */
export function minutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours ? hours + "h" : ""} ${remainingMinutes ? String(remainingMinutes).padStart(2, "0") + "m" : ""}`;
}

export function capitalizeRomanNumerals(s: string) {
  const matches = [
    "i",
    "ii",
    "iii",
    "iv",
    "v",
    "vi",
    "vii",
    "viii",
    "ix",
    "x",
    "xi",
    "xii",
    "xiii",
    "xiv",
    "xv",
  ];
  const matchesWithColons = matches.map((m) => `${m}:`);
  const allMatches = [...matches, ...matchesWithColons];

  return s
    .split(" ")
    .map((word) => (allMatches.includes(word) ? word.toUpperCase() : word))
    .join(" ");
}

/**
 * Remove Articles from String
 */
export function removeArticles(str: string) {
  const articles = ["a ", "an ", "the "]; // Note the trailing spaces
  let lowerStr = str.toLowerCase();

  for (const article of articles) {
    if (lowerStr.startsWith(article)) {
      return str.substring(article.length).trim(); // Remove article and trim
    }
  }
  return str;
}

/**
 * Get Page Menu Links from Path
 */
export function getPageMenuLinksFromPath(path: string) {
  const linkParent = [...ALL_LINKS].filter((l) => l.path === path);
  return [{ path, title: linkParent[0].allTitle }, ...linkParent[0].children];
}

/**
 * Get Tag Descriptions
 */
export function getTagDescription(name: string): string {
  return TAG_DESCRIPTIONS[name.toUpperCase()];
}

/**
 * Get Author Descriptions
 */
export function getAuthorDescription(name: string): string {
  return AUTHOR_DESCRIPTIONS[name.toUpperCase()];
}

/**
 * Check localStorage availability
 */
export function isLocalStorageAvailable() {
  if (typeof localStorage === "undefined") return false;

  const hi = "hi";
  try {
    localStorage.setItem(hi, hi);
    localStorage.removeItem(hi);
    return true;
  } catch (e) {
    return false;
  }
}
