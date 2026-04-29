/**
 * Texto pedagógico tras responder (campo opcional `explanation` en datos).
 * @param {{ options?: string[], correctAnswer?: number, correctIndex?: number, explanation?: string }} q
 * @param {boolean} wasCorrect
 */
export function getQuestionExplanation(q, wasCorrect) {
  if (q.explanation && String(q.explanation).trim()) return String(q.explanation).trim()
  const idx = q.correctAnswer ?? q.correctIndex
  if (q.options && typeof idx === 'number' && q.options[idx]) {
    return wasCorrect
      ? `Correcto: "${q.options[idx]}" es la respuesta alineada con el equipo.`
      : `La respuesta correcta es "${q.options[idx]}". Repasa el contexto de tu espacio en teoría si lo necesitas.`
  }
  return wasCorrect
    ? 'Buen criterio: sigue asi.'
    : 'No era esa opcion. Lee con calma y prueba de nuevo en el repaso.'
}

/** Para verdadero/falso con `correct` boolean */
export function getTrueFalseExplanation(q, wasCorrect) {
  if (q.explanation && String(q.explanation).trim()) return String(q.explanation).trim()
  return wasCorrect
    ? `Efectivamente: la afirmacion es ${q.correct ? 'verdadera' : 'falsa'} segun nuestra forma de trabajar.`
    : `La afirmacion es ${q.correct ? 'verdadera' : 'falsa'}. ${q.text ? `Relee: "${q.text.slice(0, 120)}${q.text.length > 120 ? '…' : ''}"` : ''}`
}

/** Intruso: explica por qué el oddIndex no encaja */
export function getOddOneExplanation(q, pickedIndex, wasCorrect) {
  if (q.explanation && String(q.explanation).trim()) return String(q.explanation).trim()
  const odd = q.options?.[q.oddIndex]
  if (wasCorrect && odd) return `Correcto: "${odd}" es la que no encaja con el resto del grupo.`
  if (odd) return `El intruso era "${odd}": no encaja con las otras opciones del mismo tema.`
  return wasCorrect ? 'Bien visto.' : 'Esa era del grupo; el intruso era otra opcion.'
}
