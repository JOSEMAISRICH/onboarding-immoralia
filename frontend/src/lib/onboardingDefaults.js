import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import { normalizeWorkplaceId } from '../data/workplace'

/** Debe coincidir con progressStorage (v) y con schemaVersion del API. */
export const ONBOARDING_SCHEMA_VERSION = 12

export function emptyScores() {
  const extras = Object.fromEntries(EXTRA_GAME_KEYS.map((k) => [k, 0]))
  return {
    registros: 0,
    valores: 0,
    quiz: 0,
    puzzle: 0,
    miniTrueFalse: 0,
    miniMatch: 0,
    miniScramble: 0,
    miniOdd: 0,
    miniScenario: 0,
    miniMemory: 0,
    miniWordle: 0,
    miniWhoToAsk: 0,
    ...extras,
  }
}

/**
 * @param {unknown} raw
 * @returns {{ stepIndex: number, userName: string, workplace: 'general'|'immoralia'|'imcontent'|'immedia', startedAt: number | null, scoreByModule: Record<string, number> }}
 */
export function normalizeProgress(raw) {
  if (!raw || typeof raw !== 'object') {
    return {
      stepIndex: 0,
      userName: '',
      workplace: 'general',
      startedAt: null,
      scoreByModule: emptyScores(),
    }
  }
  const o = /** @type {Record<string, unknown>} */ (raw)
  const scoreIn = o.scoreByModule && typeof o.scoreByModule === 'object' ? o.scoreByModule : {}
  return {
    stepIndex: typeof o.stepIndex === 'number' ? o.stepIndex : 0,
    userName: typeof o.userName === 'string' ? o.userName : '',
    workplace: normalizeWorkplaceId(o.workplace),
    startedAt: typeof o.startedAt === 'number' ? o.startedAt : null,
    scoreByModule: {
      ...emptyScores(),
      .../** @type {Record<string, number>} */ (scoreIn),
    },
  }
}
