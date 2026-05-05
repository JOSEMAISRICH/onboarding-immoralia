/**
 * Frases divertidas tipo Duolingo entre minijuegos (ES).
 * El índice evita que siempre salga la misma frase en el mismo orden.
 */

const LEVEL_DONE_HEADLINES = [
  '¡Nivel superado!',
  '¡Lo clavaste!',
  '¡Otro capítulo en el bolsillo!',
  'Así da gusto aprender.',
  'Tu cerebro pidió más y tú respondiste.',
  '¡Sigues imparable!',
  'Menudo combo de foco y curiosidad.',
]

const LEVEL_DONE_SUBS = [
  'Respira un segundo… lo siguiente también te va a molar.',
  'Poquito a poquito y sin quemarte; vas muy bien.',
  'La práctica se nota. Sigue así.',
  'Immoralia suma una persona más preparada: tú.',
  'Si algo fue difícil, ya es conocimiento; crack.',
]

const NEXT_INTROS = [
  'Siguiente parada',
  'Te espera',
  'A por el siguiente',
  'Estreno próximo',
  'Siguiente misión',
]

/**
 * @param {number} finishedStepIndex
 * @param {number} salt
 */
export function pickLevelDoneHeadline(finishedStepIndex, salt = 0) {
  const i = Math.abs((finishedStepIndex * 17 + salt) % LEVEL_DONE_HEADLINES.length)
  return LEVEL_DONE_HEADLINES[i]
}

export function pickLevelDoneSub(finishedStepIndex, salt = 0) {
  const i = Math.abs((finishedStepIndex * 11 + salt + 3) % LEVEL_DONE_SUBS.length)
  return LEVEL_DONE_SUBS[i]
}

export function pickNextIntro(finishedStepIndex) {
  const i = Math.abs((finishedStepIndex * 13 + 5) % NEXT_INTROS.length)
  return NEXT_INTROS[i]
}
