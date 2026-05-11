import { normalizeWorkplaceId } from '../data/workplace'
import { normalizeQuestionKey } from './seenQuestionsStore'

const PREFIX = 'immoralia-minigame-resume:v1'

function storageKey(workplace, moduleKey) {
  return `${PREFIX}:${normalizeWorkplaceId(workplace)}:${moduleKey}`
}

/** Hash corto para huellas de contenido (sin crypto). */
export function resumeShortHash(text) {
  const s = String(text ?? '').slice(0, 120)
  let h = 2166136261
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(36)
}

/** Hash de contenido largo (huellas de listas); `resumeShortHash` solo mira 120 chars. */
export function resumeContentHash(text, maxChars = 16000) {
  const s = String(text ?? '').slice(0, maxChars)
  let h = 2166136261
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(36)
}

/** Rondas de ahorcado (palabras elegidas en la sesión). */
export function fingerprintHangman(rounds) {
  if (!rounds?.length) return '0'
  const ids = rounds.map((r) => String(r.word ?? '').toUpperCase()).join(',')
  return `${rounds.length}:${resumeContentHash(ids)}`
}

/** Huella para arrays de preguntas tipo quiz (campo question). */
export function fingerprintQuestions(list, field = 'question') {
  if (!list?.length) return '0'
  const payload = list.map((item) => normalizeQuestionKey(String(item?.[field] ?? ''))).join('\x1f')
  return `${list.length}:${resumeContentHash(payload)}`
}

/** Verdadero/falso u ódd one con `.text` */
export function fingerprintByText(list) {
  if (!list?.length) return '0'
  const payload = list.map((item) => normalizeQuestionKey(String(item?.text ?? ''))).join('\x1f')
  return `${list.length}:${resumeContentHash(payload)}`
}

export function fingerprintPairs(pairs) {
  if (!pairs?.length) return '0'
  const ids = pairs.map((p) => p.id).join(',')
  return `${pairs.length}:${resumeShortHash(ids)}`
}

export function fingerprintSteps(steps) {
  if (!steps?.length) return '0'
  return `${steps.length}:${resumeShortHash(steps.join('|'))}`
}

export function fingerprintWordle(config) {
  const w = config?.word ?? ''
  return `${w.length}:${resumeShortHash(w)}`
}

/** Escenarios / a quién consultar */
export function fingerprintPromptField(rounds, field) {
  if (!rounds?.length) return '0'
  const payload = rounds.map((r) => normalizeQuestionKey(String(r?.[field] ?? ''))).join('\x1f')
  return `${rounds.length}:${resumeContentHash(payload)}`
}

/** Palabras revueltas */
export function fingerprintScrambleRounds(rounds) {
  if (!rounds?.length) return '0'
  const payload = rounds.map((r) => `${r.hint ?? ''}|${r.answer ?? ''}`).join('\x1f')
  return `${rounds.length}:${resumeContentHash(payload)}`
}

/**
 * @param {string} workplace
 * @param {string} moduleKey
 * @param {string} fingerprint
 * @returns {unknown | null}
 */
export function readGameResume(workplace, moduleKey, fingerprint) {
  try {
    const raw = localStorage.getItem(storageKey(workplace, moduleKey))
    if (!raw) return null
    const o = JSON.parse(raw)
    if (o.fp !== fingerprint) return null
    return o.payload ?? null
  } catch {
    return null
  }
}

/**
 * @param {string} workplace
 * @param {string} moduleKey
 * @param {string} fingerprint
 * @param {unknown} payload
 */
export function writeGameResume(workplace, moduleKey, fingerprint, payload) {
  try {
    localStorage.setItem(storageKey(workplace, moduleKey), JSON.stringify({ fp: fingerprint, payload }))
  } catch {
    /* quota / private mode */
  }
}

/** Al terminar el minijuego (pasar de nivel). */
export function clearGameResume(workplace, moduleKey) {
  try {
    localStorage.removeItem(storageKey(workplace, moduleKey))
  } catch {
    /* ignore */
  }
}
