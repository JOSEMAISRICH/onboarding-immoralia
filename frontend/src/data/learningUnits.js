import { EXTRA_GAME_KEYS, extraGames } from './extraMinijuegos10'
import { EXTRA_START_STEP } from '../lib/onboardingSteps'

/**
 * @typedef {{ stepIndex: number, title: string, objective: string, minutes: number, emoji: string }} LearningUnit
 */

/**
 * Unidades didacticas (estilo leccion corta) alineadas con stepIndex de App.
 * @param {number} finishStepIndex mismo valor que FINISH_STEP (pantalla final)
 * @returns {LearningUnit[]}
 */
export function getLearningUnits(finishStepIndex) {
  const base = /** @type {LearningUnit[]} */ ([
    {
      stepIndex: 1,
      title: 'Herramientas y normas',
      objective: 'Tras la teoría en la biblioteca, comprobar que sabes donde mirar y que normas aplican.',
      minutes: 5,
      emoji: '🛠️',
    },
    {
      stepIndex: 2,
      title: 'Valores del manifiesto',
      objective: 'Diez preguntas rapidas: enlazar frases y situaciones con Servicio, Transparencia, Innovacion y Resultados.',
      minutes: 6,
      emoji: '💎',
    },
    {
      stepIndex: 3,
      title: 'El ahorcado',
      objective:
        'Siete palabras sobre herramientas y apps del dia a dia: adivina letra a letra, sin tiempo limite y con pista siempre visible.',
      minutes: 8,
      emoji: '🔠',
    },
    {
      stepIndex: 4,
      title: 'Ordena el proceso',
      objective: 'Poner en orden los pasos en una situacion real.',
      minutes: 4,
      emoji: '🧩',
    },
    {
      stepIndex: 5,
      title: 'Verdadero o falso',
      objective: 'Afirmaciones rapidas sobre como trabajamos.',
      minutes: 3,
      emoji: '✅',
    },
    {
      stepIndex: 6,
      title: 'Empareja',
      objective: 'Unir conceptos con su rol o significado.',
      minutes: 3,
      emoji: '🔗',
    },
    {
      stepIndex: 7,
      title: 'Palabra revuelta',
      objective: 'Descifrar terminos clave del onboarding.',
      minutes: 3,
      emoji: '🔤',
    },
    {
      stepIndex: 8,
      title: 'El intruso',
      objective: 'Detectar lo que no encaja con nuestra forma de trabajar.',
      minutes: 3,
      emoji: '🎯',
    },
    {
      stepIndex: 9,
      title: 'Escenarios',
      objective: 'Elegir la reaccion mas alineada con cultura y proceso.',
      minutes: 4,
      emoji: '🎬',
    },
    {
      stepIndex: 10,
      title: 'Memoria',
      objective: 'Emparejar conceptos clave (dos intentos de memoria visual).',
      minutes: 3,
      emoji: '🃏',
    },
    {
      stepIndex: 11,
      title: 'Palabra oculta',
      objective: 'Tres palabras seguidas: adivina cada termino en hasta seis intentos; las palabras cambian en cada sesion.',
      minutes: 10,
      emoji: '🟩',
    },
    {
      stepIndex: 12,
      title: 'A quien consultar',
      objective: 'Asignar cada caso al rol adecuado del equipo.',
      minutes: 4,
      emoji: '🧭',
    },
  ])

  const extras = EXTRA_GAME_KEYS.map((key, i) => {
    const g = extraGames.find((x) => x.key === key)
    const shortTitle = g?.title ? `${g.title}` : `Extra ${i + 1}`
    return {
      stepIndex: EXTRA_START_STEP + i,
      title: g?.listTitle || `Extra ${i + 1}`,
      objective: `Refuerzo: ${shortTitle.toLowerCase()}.`,
      minutes: 2,
      emoji: '⭐',
    }
  })

  const meta = {
    stepIndex: finishStepIndex,
    title: 'Cierre y medalla',
    objective: 'Resumen, medalla por tu puntuacion y bienvenida al equipo.',
    minutes: 2,
    emoji: '🏁',
  }

  return [...base, ...extras, meta]
}

/**
 * @param {number} stepIndex
 * @param {number} finishStepIndex
 * @returns {LearningUnit | undefined}
 */
export function getUnitForStep(stepIndex, finishStepIndex) {
  return getLearningUnits(finishStepIndex).find((u) => u.stepIndex === stepIndex)
}
