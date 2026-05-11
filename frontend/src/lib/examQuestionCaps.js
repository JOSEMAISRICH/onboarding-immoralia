/**
 * Cuántas preguntas/rondas salen por sesión (el banco en datos puede ser mayor).
 * La selección ordena primero ítems relacionados con herramientas (`toolsPriorityScore`).
 */
export const EXAM_CAPS = {
  modulo1: 5,
  quiz: 4,
  /** Rondas del ahorcado (paso 3); no usar para el quiz MCQ antiguo. */
  hangman: 7,
  trueFalse: 4,
  oddOne: 3,
  /** Palabra revuelta: un poco mas de peso para no ser el paso mas corto del bloque central. */
  scramble: 3,
}
