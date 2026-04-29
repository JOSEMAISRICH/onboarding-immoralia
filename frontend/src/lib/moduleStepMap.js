import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import { EXTRA_START_STEP } from './onboardingSteps'

/** Claves de scoreByModule → stepIndex en GamesPage (alineado con STEPS). */
export const MODULE_KEY_TO_STEP = {
  registros: 1,
  valores: 2,
  quiz: 3,
  puzzle: 4,
  miniTrueFalse: 5,
  miniMatch: 6,
  miniScramble: 7,
  miniOdd: 8,
  miniScenario: 9,
  miniMemory: 10,
  miniWordle: 11,
  miniWhoToAsk: 12,
}

/**
 * @param {string} moduleKey
 * @returns {number | null}
 */
export function getStepIndexForModuleKey(moduleKey) {
  if (Object.prototype.hasOwnProperty.call(MODULE_KEY_TO_STEP, moduleKey)) {
    return MODULE_KEY_TO_STEP[moduleKey]
  }
  const ei = EXTRA_GAME_KEYS.indexOf(moduleKey)
  if (ei >= 0) return EXTRA_START_STEP + ei
  return null
}

/**
 * @param {number} stepIndex
 * @returns {string | null} clave en scoreByModule / maxByModule, o null (p. ej. pantalla final)
 */
export function getModuleKeyForStep(stepIndex) {
  for (const [key, idx] of Object.entries(MODULE_KEY_TO_STEP)) {
    if (idx === stepIndex) return key
  }
  const ei = stepIndex - EXTRA_START_STEP
  if (ei >= 0 && ei < EXTRA_GAME_KEYS.length) return EXTRA_GAME_KEYS[ei]
  return null
}
