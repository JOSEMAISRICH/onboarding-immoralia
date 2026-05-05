import { normalizeWorkplaceId } from '../data/workplace'
import { EXAM_CAPS } from './examQuestionCaps'
import { loadSeenQuestionKeys, markExamQuestionsSeen, normalizeQuestionKey } from './seenQuestionsStore'

export { EXAM_CAPS } from './examQuestionCaps'

const TOOL_HINTS = [
  'clickup',
  'slack',
  'n8n',
  'holded',
  'lastpass',
  'whimsical',
  'loom',
  'notion',
  'webhook',
  ' automat',
  'api ',
  'api.',
  'tokens ',
  'credencial',
  'dns',
  'hostinger',
  'zapier',
  'integraci',
  'herramient',
  'workflow',
  'fichaje',
  'drive',
  'sheet',
  'plataforma',
  'make.com',
]

export function toolsPriorityScore(text) {
  const t = normalizeQuestionKey(text)
  let s = 0
  for (const k of TOOL_HINTS) {
    if (t.includes(k)) s += 1
  }
  return s
}

/**
 * Quita preguntas ya vistas en este onboarding, ordena priorizando herramientas y recorta.
 * Si el filtro deja la lista vacía, reusa el banco completo (sesión nueva / pool agotado).
 */
export function prepareExamQuestionPool(workplace, items, getQuestionText, maxCount) {
  const wp = normalizeWorkplaceId(workplace)
  if (!items?.length) return []
  const seen = loadSeenQuestionKeys(wp)
  let pool = items.filter((item) => !seen.has(normalizeQuestionKey(getQuestionText(item))))
  if (pool.length === 0) pool = [...items]
  pool.sort((a, b) => toolsPriorityScore(getQuestionText(b)) - toolsPriorityScore(getQuestionText(a)))
  return pool.slice(0, Math.min(maxCount, pool.length))
}

export function prepareModulo1Items(workplace, items) {
  return prepareExamQuestionPool(workplace, items, (q) => q.question, EXAM_CAPS.modulo1)
}

export function prepareQuizItems(workplace, items) {
  return prepareExamQuestionPool(workplace, items, (q) => q.question, EXAM_CAPS.quiz)
}

export function prepareTrueFalseItems(workplace, items) {
  return prepareExamQuestionPool(workplace, items, (q) => q.text, EXAM_CAPS.trueFalse)
}

export function prepareOddItems(workplace, items) {
  return prepareExamQuestionPool(workplace, items, (q) => q.question, EXAM_CAPS.oddOne)
}

export function prepareScrambleRounds(workplace, rounds) {
  return prepareExamQuestionPool(
    workplace,
    rounds,
    (r) => `${r.hint ?? ''}|${r.answer ?? r.options?.[r.correctIndex] ?? ''}`,
    EXAM_CAPS.scramble,
  )
}

export { markExamQuestionsSeen } from './seenQuestionsStore'

/** Una sola pregunta (texto literal del enunciado). */
export function markExamQuestionSeen(workplace, questionText) {
  markExamQuestionsSeen(normalizeWorkplaceId(workplace), [questionText])
}
