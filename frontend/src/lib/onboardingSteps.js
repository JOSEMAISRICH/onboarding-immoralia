import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'

/** Cuatro minijuegos nuevos entre El intruso y los extras (pasos 9–12). */
export const MID_GAME_KEYS = ['miniScenario', 'miniMemory', 'miniWordle', 'miniWhoToAsk']

export const EXTRA_START_STEP = 9 + MID_GAME_KEYS.length
export const FINISH_STEP = EXTRA_START_STEP + EXTRA_GAME_KEYS.length

export const STEPS = [
  'Welcome',
  'MiniHerramientas',
  'MiniValores',
  'Quiz',
  'Puzzle',
  'MiniTrueFalse',
  'MiniMatch',
  'MiniScramble',
  'MiniOdd',
  'MiniScenario',
  'MiniMemory',
  'MiniWordle',
  'MiniWhoToAsk',
  ...EXTRA_GAME_KEYS,
  'Finish',
]
