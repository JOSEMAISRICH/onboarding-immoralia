/**
 * Rangos por % de avance del recorrido (pasos completados vs pantalla final).
 * No es competitivo ni ranking: solo acompañamiento, como pidió el equipo.
 * Paleta mas alegre: calidos + cielo (evitar gris plata frio).
 */
import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import { EXTRA_START_STEP } from './onboardingSteps'

/** Ultimo stepIndex del onboarding (pantalla Finish). Debe coincidir con App.jsx */
export function getFinishStepIndex() {
  return EXTRA_START_STEP + EXTRA_GAME_KEYS.length
}

/**
 * @param {number} stepIndex
 * @returns {number} 0–100
 */
export function getJourneyCompletionPercent(stepIndex) {
  const finish = getFinishStepIndex()
  if (stepIndex <= 0) return 0
  return Math.min(100, Math.round((stepIndex / finish) * 100))
}

/**
 * @typedef {{ id: string, label: string, emoji: string, description: string, barClass: string, badgeClass: string }} JourneyTier
 */

/** @returns {JourneyTier} */
/** Id de rango segun el paso del recorrido (para comparar sin interrumpir en cada pregunta). */
export function getTierIdForStep(stepIndex) {
  return getJourneyTier(getJourneyCompletionPercent(stepIndex)).id
}

export function getJourneyTier(completionPercent) {
  const p = Math.max(0, Math.min(100, completionPercent))
  if (p >= 100) {
    return {
      id: 'platinum',
      label: 'Platino',
      emoji: '💎',
      description: 'Onboarding completado — ya formas parte de Immoralia',
      barClass: 'from-amber-300 via-fuchsia-400 to-sky-400',
      badgeClass:
        'border-amber-300/45 bg-gradient-to-br from-amber-500/30 via-fuchsia-500/20 to-sky-500/25 text-amber-50 shadow-lg shadow-amber-900/25',
    }
  }
  if (p >= 80) {
    return {
      id: 'gold',
      label: 'Oro',
      emoji: '🥇',
      description: 'Casi al final — sigue un poco mas',
      barClass: 'from-yellow-300 via-amber-400 to-orange-400',
      badgeClass:
        'border-yellow-300/50 bg-gradient-to-br from-yellow-500/25 to-amber-600/30 text-amber-50',
    }
  }
  if (p >= 50) {
    return {
      id: 'silver',
      label: 'Plata',
      emoji: '🥈',
      description: 'Vas por la mitad — buen ritmo',
      barClass: 'from-sky-300 via-indigo-300 to-violet-300',
      badgeClass:
        'border-sky-300/50 bg-gradient-to-br from-sky-500/25 to-violet-500/25 text-sky-50',
    }
  }
  if (p >= 20) {
    return {
      id: 'bronze',
      label: 'Bronce',
      emoji: '🥉',
      description: 'Primer tramo superado — sigue asi',
      barClass: 'from-orange-400 via-amber-500 to-yellow-500',
      badgeClass:
        'border-orange-400/50 bg-gradient-to-br from-orange-600/35 to-amber-500/25 text-orange-50',
    }
  }
  return {
    id: 'starting',
    label: 'En marcha',
    emoji: '🌱',
    description: 'Has empezado — cada paso cuenta',
    barClass: 'from-amber-300 via-lime-300 to-sky-400',
    badgeClass:
      'border-amber-300/45 bg-gradient-to-br from-amber-500/20 via-lime-500/15 to-sky-500/20 text-amber-50',
  }
}

/**
 * Texto corto para animar al siguiente umbral (sin tono competitivo).
 * @param {number} completionPercent
 * @returns {string | null} null si ya en platino
 */
export function getNextTierHint(completionPercent) {
  const p = Math.max(0, Math.min(100, completionPercent))
  if (p < 20) return 'Bronce al 20% del recorrido'
  if (p < 50) return 'Plata al 50%'
  if (p < 80) return 'Oro al 80%'
  if (p < 100) return 'Platino al completar el ultimo paso'
  return null
}
