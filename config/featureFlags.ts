/**
 * Application-wide feature flags and debug logging configuration
 */

/**
 * Feature flags control the availability of features in the application
 */
export const FEATURE_FLAGS = {
  teaserContent: true,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

/**
 * Debug flags control logging output for different categories
 */
export const DEBUG_FLAGS = {
  /** Storage calculation logs (e.g., calculateProjectSize, studioStorageUsage) */
  storage: false,
  /** Analysis state and progress logs (e.g., useAnalysis) */
  analysis: false,
  /** UI state and rendering logs (e.g., StudioSwitcher, ChatMessage, StudioEditorApp accent color) */
  ui: false,
  /** Project operations (e.g., create, delete, update) */
  projects: false,
  /** Chat operations (e.g., Ask/Edit tabs) */
  chat: false,
  /** System/infrastructure logs (e.g., service worker) */
  system: false,
  /** Global flag that overrides individual flags when true */
  all: false,
} as const;

export type DebugFlag = keyof typeof DEBUG_FLAGS;

/**
 * Check if debug logging is enabled for a specific category
 * @param category - The debug category to check
 * @returns true if debug logging is enabled for the category
 */
export const isDebugEnabled = (category: DebugFlag): boolean => {
  return DEBUG_FLAGS.all || DEBUG_FLAGS[category];
};

