import { ONBOARDING_SCHEMA_VERSION } from './onboardingDefaults'

const STORAGE_KEY = 'immoralia-onboarding-v4'

/**
 * @typedef {Object} SavedProgress
 * @property {number} stepIndex
 * @property {string} userName
 * @property {string} [workplace]
 * @property {number | null} startedAt
 * @property {Record<string, number>} scoreByModule
 */

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.v === 10) {
      const upgraded = { ...data, v: 11, workplace: data.workplace ?? 'general' }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(upgraded))
      } catch {
        /* ignore */
      }
      return upgraded
    }
    if (data.v !== ONBOARDING_SCHEMA_VERSION) return null
    return data
  } catch {
    return null
  }
}

/** @param {Omit<SavedProgress, never> & { v?: number }} payload */
export function saveProgress(payload) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: ONBOARDING_SCHEMA_VERSION, ...payload }),
    )
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
