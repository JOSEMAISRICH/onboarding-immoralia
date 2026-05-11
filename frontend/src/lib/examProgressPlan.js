import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'
import { preguntasMiniValores } from '../data/miniValoresJuego'
import { WORDLE_MAX_TRIES, WORDLE_ROUNDS_PER_SESSION } from '../data/workplaceMiniNewFour'
import { EXTRA_START_STEP } from './onboardingSteps'

const STEP_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/**
 * @param {{
 *   modulo1Len: number
 *   quizLen: number
 *   puzzleLen: number
 *   tfLen: number
 *   matchLen: number
 *   scrambleLen: number
 *   oddLen: number
 *   scenarioLen: number
 *   memoryLen: number
 *   whoLen: number
 *   extraLen?: number
 * }} lengths
 */
export function buildExamProgressPlan(lengths) {
  const raw = {
    1: lengths.modulo1Len,
    2: preguntasMiniValores.length,
    3: lengths.quizLen,
    4: lengths.puzzleLen,
    5: lengths.tfLen,
    6: lengths.matchLen,
    7: lengths.scrambleLen,
    8: lengths.oddLen,
    9: lengths.scenarioLen,
    10: lengths.memoryLen,
    11: WORDLE_MAX_TRIES * WORDLE_ROUNDS_PER_SESSION,
    12: lengths.whoLen,
  }

  /** @type {Record<number, number>} */
  const offsetByStep = {}
  let acc = 0
  for (const s of STEP_ORDER) {
    const n = Math.max(0, Math.floor(Number(raw[s]) || 0))
    offsetByStep[s] = acc
    acc += n
  }

  const extraLen =
    typeof lengths.extraLen === 'number'
      ? Math.max(0, Math.floor(lengths.extraLen))
      : EXTRA_GAME_KEYS.length
  for (let i = 0; i < extraLen; i += 1) {
    offsetByStep[EXTRA_START_STEP + i] = acc + i
  }
  acc += extraLen

  return { offsetByStep, total: acc }
}
