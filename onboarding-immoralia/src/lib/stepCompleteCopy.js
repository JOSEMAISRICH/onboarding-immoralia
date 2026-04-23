/**
 * Microcopy breve y tono profesional (no infantil). Rotan por paso para variar.
 */
const POOL = [
  'Buen trabajo. Sigue al siguiente bloque cuando quieras.',
  'Bloque listo. El recorrido avanza.',
  'Hecho. Un paso mas cerca del final.',
  'Completado. Puedes continuar con calma.',
  'Listo. La siguiente parte te espera.',
  'Bien hecho. Sigue cuando te venga bien.',
  'Este bloque queda cerrado. Siguiente paso.',
  'Perfecto. Avanza al siguiente modulo.',
]

/** @param {number} stepJustFinished stepIndex del bloque recien terminado (1..18 antes de Finish) */
export function getStepCompleteMessage(stepJustFinished) {
  if (stepJustFinished <= 0) return POOL[0]
  return POOL[stepJustFinished % POOL.length]
}

/** Titulo fijo del overlay */
export const STEP_COMPLETE_TITLE = 'Bloque completado'
