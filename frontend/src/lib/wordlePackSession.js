import { normalizeWorkplaceId } from '../data/workplace'
import { WORDLE_ROUNDS_PER_SESSION } from '../data/workplaceMiniNewFour'

export function wordlePackStorageKey(workplace) {
  return `immoralia-wordle-pack:v2:${normalizeWorkplaceId(workplace)}`
}

export function clearWordlePackSession(workplace) {
  try {
    sessionStorage.removeItem(wordlePackStorageKey(workplace))
  } catch {
    /* ignore */
  }
}

/**
 * @returns {{ configs: { word: string, clue: string }[], roundIndex: number, pointsSoFar: number } | null}
 */
export function readWordlePack(workplace) {
  try {
    const raw = sessionStorage.getItem(wordlePackStorageKey(workplace))
    if (!raw) return null
    const o = JSON.parse(raw)
    if (!Array.isArray(o.configs) || o.configs.length !== WORDLE_ROUNDS_PER_SESSION) return null
    for (const c of o.configs) {
      if (!c?.word || !c?.clue || String(c.word).length !== 5) return null
    }
    if (typeof o.roundIndex !== 'number' || o.roundIndex < 0 || o.roundIndex >= WORDLE_ROUNDS_PER_SESSION)
      return null
    const pointsSoFar = typeof o.pointsSoFar === 'number' ? o.pointsSoFar : 0
    return { configs: o.configs, roundIndex: o.roundIndex, pointsSoFar }
  } catch {
    return null
  }
}

/** @param {{ configs: { word: string, clue: string }[], roundIndex: number, pointsSoFar: number }} pack */
export function writeWordlePack(workplace, pack) {
  try {
    sessionStorage.setItem(wordlePackStorageKey(workplace), JSON.stringify(pack))
  } catch {
    /* quota / private mode */
  }
}
