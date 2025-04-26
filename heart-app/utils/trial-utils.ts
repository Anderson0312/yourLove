/**
 * Utility functions for managing the free trial
 */

/**
 * Check if the free trial has expired
 * @param trialStartDate The date when the trial started
 * @returns {boolean} True if the trial has expired, false if still valid
 */
export function isTrialExpired(trialStartDate: Date | string | null): boolean {
  if (!trialStartDate) {
    return true // No start date found, consider expired
  }

  try {
    const startDate = new Date(trialStartDate)
    const currentDate = new Date()

    // Calculate time difference in milliseconds
    const timeDifference = currentDate.getTime() - startDate.getTime()

    // Convert to hours (1000ms * 60s * 60min = 3,600,000ms in an hour)
    const hoursDifference = timeDifference / 3600000

    // Trial expires after 24 hours
    return hoursDifference >= 24
  } catch (error) {
    console.error("Error checking trial expiration:", error)
    return true // If there's an error, consider the trial expired
  }
}

/**
 * Get remaining trial time in hours and minutes
 * @param trialStartDate The date when the trial started
 * @returns {Object} Object containing hours and minutes remaining
 */
export function getRemainingTrialTime(trialStartDate: Date | string | null): { hours: number; minutes: number } {
  if (!trialStartDate) {
    return { hours: 0, minutes: 0 } // No start date found, no time remaining
  }

  try {
    const startDate = new Date(trialStartDate)
    const currentDate = new Date()

    // Calculate time difference in milliseconds
    const timeDifference = startDate.getTime() + 24 * 3600000 - currentDate.getTime()

    if (timeDifference <= 0) {
      return { hours: 0, minutes: 0 } // Trial expired
    }

    // Convert to hours and minutes
    const hours = Math.floor(timeDifference / 3600000)
    const minutes = Math.floor((timeDifference % 3600000) / 60000)

    return { hours, minutes }
  } catch (error) {
    console.error("Error calculating remaining trial time:", error)
    return { hours: 0, minutes: 0 } // If there's an error, return no time remaining
  }
}

/**
 * Format remaining time as a string
 * @param remaining Object containing hours and minutes
 * @returns {string} Formatted time string
 */
export function formatRemainingTime(remaining: { hours: number; minutes: number }): string {
  if (remaining.hours > 0) {
    return `${remaining.hours}h ${remaining.minutes}m`
  } else {
    return `${remaining.minutes} minutos`
  }
}
