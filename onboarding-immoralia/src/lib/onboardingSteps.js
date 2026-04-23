import { EXTRA_GAME_KEYS } from '../data/extraMinijuegos10'

export const EXTRA_START_STEP = 9
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
  ...EXTRA_GAME_KEYS,
  'Finish',
]
