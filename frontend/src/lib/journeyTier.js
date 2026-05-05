/**
 * Rangos por % de avance del recorrido (pasos completados vs pantalla final).
 * No es competitivo ni ranking: solo acompañamiento, como pidió el equipo.
 * Paleta “aula”: azul + salvia + acentos cálidos (logros), sin fucsia/violeta dominantes.
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
      barClass: 'from-blue-500 via-teal-500 to-emerald-600',
      badgeClass:
        'border-blue-300/70 bg-gradient-to-br from-white via-blue-50 to-emerald-50 text-slate-800 shadow-md shadow-blue-200/45',
    }
  }
  if (p >= 80) {
    return {
      id: 'gold',
      label: 'Oro',
      emoji: '🥇',
      description: 'Casi al final — sigue un poco mas',
      barClass: 'from-yellow-400 via-amber-500 to-orange-500',
      badgeClass:
        'border-amber-300/70 bg-gradient-to-br from-amber-50 to-orange-50 text-slate-800 shadow-md shadow-amber-200/50',
    }
  }
  if (p >= 50) {
    return {
      id: 'silver',
      label: 'Plata',
      emoji: '🥈',
      description: 'Vas por la mitad — buen ritmo',
      barClass: 'from-sky-400 via-blue-500 to-teal-600',
      badgeClass:
        'border-blue-300/70 bg-gradient-to-br from-sky-50 to-blue-50 text-slate-800 shadow-md shadow-blue-200/45',
    }
  }
  if (p >= 20) {
    return {
      id: 'bronze',
      label: 'Bronce',
      emoji: '🥉',
      description: 'Primer tramo superado — sigue asi',
      barClass: 'from-orange-500 via-amber-500 to-yellow-400',
      badgeClass:
        'border-orange-300/70 bg-gradient-to-br from-orange-50 to-amber-50 text-slate-800 shadow-md shadow-orange-200/45',
    }
  }
  return {
    id: 'starting',
    label: 'En marcha',
    emoji: '🌱',
    description: 'Has empezado — cada paso cuenta',
    barClass: 'from-emerald-500 via-teal-500 to-blue-600',
    badgeClass:
      'border-emerald-300/70 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 text-slate-800 shadow-md shadow-emerald-200/35',
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
