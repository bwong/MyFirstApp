/**
 * Date utility functions for the calendar app
 */

/**
 * Formats a local civil date object into a readable string
 * @param {Object} dateObj - Date object with year, month, day
 * @returns {string} Formatted date string (e.g., "Mon, Sep 22, 2025")
 */
export function formatLocalCivilDate({ year, month, day }) {
  // Construct local midnight; no UTC conversion → no off-by-one.
  const d = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    // no timeZone specified → uses device's local zone
  }).format(d);
}

/**
 * Creates a date string in YYYY-MM-DD format
 * @param {Object} dateObj - Date object with year, month, day
 * @returns {string} Date string in YYYY-MM-DD format
 */
export function createDateString({ year, month, day }) {
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDay = String(day).padStart(2, '0');
  return `${year}-${paddedMonth}-${paddedDay}`;
}

/**
 * Parses a date string in YYYY-MM-DD format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Object} Date object with year, month, day
 */
export function parseDateString(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return { year, month, day };
}
