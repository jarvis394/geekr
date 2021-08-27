/**
 * Safely parses JSON string
 * @param s JSON string
 * @param fallbackData Fallback data to return on parsing error
 */
export default <T = Record<string, unknown>, U = Record<string, unknown>>(
  s: string,
  fallbackData?: U
): T | U => {
  try {
    return JSON.parse(s)
  } catch (e) {
    if (fallbackData) return fallbackData
    else throw e
  }
}
