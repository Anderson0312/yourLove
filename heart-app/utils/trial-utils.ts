/**
 * Utility functions for managing the free trial
 */

/**
 * Check if the free trial has expired
 * @returns {boolean} True if the trial has expired or isn't active, false if still valid
 */
export function isTrialExpired(): boolean {
    // Check if user is on a free trial
    const planType = localStorage.getItem("planType")
    if (planType !== "free-trial") {
      return false // Not on a trial, so not expired
    }
  
    // Get trial start date
    const trialStartDateStr = localStorage.getItem("trialStartDate")
    if (!trialStartDateStr) {
      return true // No start date found, consider expired
    }
  
    try {
      const trialStartDate = new Date(trialStartDateStr)
      const currentDate = new Date()
  
      // Calculate time difference in milliseconds
      const timeDifference = currentDate.getTime() - trialStartDate.getTime()
  
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
   * @returns {Object} Object containing hours and minutes remaining, or null if not on trial
   */
  export function getRemainingTrialTime(): { hours: number; minutes: number } | null {
    // Check if user is on a free trial
    const planType = localStorage.getItem("planType")
    if (planType !== "free-trial") {
      return null // Not on a trial
    }
  
    // Get trial start date
    const trialStartDateStr = localStorage.getItem("trialStartDate")
    if (!trialStartDateStr) {
      return { hours: 0, minutes: 0 } // No start date found, no time remaining
    }
  
    try {
      const trialStartDate = new Date(trialStartDateStr)
      const currentDate = new Date()
  
      // Calculate time difference in milliseconds
      const timeDifference = trialStartDate.getTime() + 24 * 3600000 - currentDate.getTime()
  
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
   * Clear trial data from localStorage
   */
  export function clearTrialData(): void {
    localStorage.removeItem("planType")
    localStorage.removeItem("trialStartDate")
  }
  