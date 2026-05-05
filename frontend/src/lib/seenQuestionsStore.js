import { normalizeWorkplaceId } from '../data/workplace'

const PREFIX = 'immoralia-seen-questions:v1'

function storageKey(workplace) {
  return `${PREFIX}:${normalizeWorkplaceId(workplace)}`
}

/** Clave estable para comparar si dos preguntas son “la misma”. */
export function normalizeQuestionKey(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500)
}

/** @returns {Set<string>} */
export function loadSeenQuestionKeys(workplace) {
  try {
    const raw = localStorage.getItem(storageKey(workplace))
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return new Set()
    return new Set(arr.filter((x) => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

function saveSeen(workplace, set) {
  try {
    localStorage.setItem(storageKey(workplace), JSON.stringify([...set]))
  } catch {
    /* quota */
  }
}

/** Registra textos de pregunta ya mostrados en esta sesión de onboarding (evita repetir entre minijuegos). */
export function markExamQuestionsSeen(workplace, texts) {
  const wp = normalizeWorkplaceId(workplace)
  if (!texts?.length) return
  const set = loadSeenQuestionKeys(wp)
  let changed = false
  for (const t of texts) {
    const k = normalizeQuestionKey(t)
    if (!k) continue
    if (!set.has(k)) {
      set.add(k)
      changed = true
    }
  }
  if (changed) saveSeen(wp, set)
}

export function clearSeenQuestionsForWorkplace(workplace) {
  try {
    localStorage.removeItem(storageKey(workplace))
  } catch {
    /* ignore */
  }
}
