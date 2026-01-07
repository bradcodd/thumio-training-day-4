import { isDebugEnabled, DebugFlag } from '../config/featureFlags';

/**
 * Debug logging utility that respects DEBUG_FLAGS configuration
 */

/**
 * Log a debug message if the category is enabled
 * @param category - The debug category to check
 * @param args - Arguments to pass to console.log
 */
export const debugLog = (category: DebugFlag, ...args: any[]): void => {
  if (isDebugEnabled(category)) {
    console.log(`[${category.toUpperCase()}]`, ...args);
  }
};

/**
 * Log a debug warning if the category is enabled
 * @param category - The debug category to check
 * @param args - Arguments to pass to console.warn
 */
export const debugWarn = (category: DebugFlag, ...args: any[]): void => {
  if (isDebugEnabled(category)) {
    console.warn(`[${category.toUpperCase()}]`, ...args);
  }
};

/**
 * Log a debug error if the category is enabled
 * Note: Errors are typically always logged, but this allows conditional error logging
 * @param category - The debug category to check
 * @param args - Arguments to pass to console.error
 */
export const debugError = (category: DebugFlag, ...args: any[]): void => {
  if (isDebugEnabled(category)) {
    console.error(`[${category.toUpperCase()}]`, ...args);
  }
};

