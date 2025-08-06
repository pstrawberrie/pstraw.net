import fs from 'node:fs';
import crypto from 'node:crypto';

/**
 * Formatting
 */
// Format bytes into readable string
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Format number into readable string
export function formatNumber(num) {
  return num.toLocaleString("en-US");
}

/**
 * API Utils
 */
// Sleep timeout for API rate limiting
export function sleep(ms = 2000) {
  return new Promise((resolve, reject) => {
    let t = setTimeout(() => {
      clearTimeout(t);
      resolve();
    }, ms);
  });
}

/**
 * Meta
 */
// Get database size
export async function getDBSize() {
  try {
    const stats = fs.statSync('./db/db.sqlite');
    let formatted = formatBytes(stats.size);
    formatted = formatted.replace(' ', '');
    return formatted;
  } catch (error) {
    console.error('Error getting DB File Size', error);
    return '0b';
  }
}

/**
 * Randoms
 */
export function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}