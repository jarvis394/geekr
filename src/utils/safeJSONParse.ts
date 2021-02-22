/**
 * Safely parses JSON string
 * @param s JSON string
 * @param fallbackData Fallback data to return on parsing error
 */
export default (s: string, fallbackData?: Record<string, unknown>) => {
  try {
    return JSON.parse(s)
  } catch (e) {
    if (fallbackData) return fallbackData
    else throw e
  }
}
