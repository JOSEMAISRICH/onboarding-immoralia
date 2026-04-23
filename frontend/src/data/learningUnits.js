import { EXTRA_GAME_KEYS, extraGames } from './extraMinijuegos10'

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
      objective: 'Saber donde mirar y que normas aplican en el dia a dia.',
      minutes: 5,
      emoji: '🛠️',
    },
    {
      stepIndex: 2,
      title: 'Valores del manifiesto',
      objective: 'Reconocer valores y como se traducen en el equipo.',
      minutes: 4,
      emoji: '💎',
    },
    {
      stepIndex: 3,
      title: 'Gran quiz',
      objective: 'Cultura y procesos con feedback al instante.',
      minutes: 6,
      emoji: '🧠',
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
  ])

  const extras = EXTRA_GAME_KEYS.map((key, i) => {
    const g = extraGames.find((x) => x.key === key)
    const shortTitle = g?.title ? `${g.title}` : `Extra ${i + 1}`
    return {
      stepIndex: 9 + i,
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
