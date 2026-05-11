import { useCallback, useState } from 'react'
import MiniWordle from './MiniWordle'
import {
  WORDLE_MAX_TRIES,
  WORDLE_ROUNDS_PER_SESSION,
} from '../data/workplaceMiniNewFour'
import { clearWordlePackSession, readWordlePack, writeWordlePack } from '../lib/wordlePackSession'

function shufflePickThree(pool) {
  const byKey = new Map()
  for (const p of pool) {
    const w = String(p.word ?? '')
      .toUpperCase()
      .trim()
    if (w.length !== 5 || byKey.has(w)) continue
    byKey.set(w, { word: w, clue: p.clue })
  }
  const unique = [...byKey.values()]
  const a = [...unique]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  if (unique.length >= WORDLE_ROUNDS_PER_SESSION) {
    return a.slice(0, WORDLE_ROUNDS_PER_SESSION)
  }
  return Array.from({ length: WORDLE_ROUNDS_PER_SESSION }, (_, i) => unique[i % Math.max(unique.length, 1)])
}

/**
 * Tres palabras ocultas seguidas; palabras elegidas al azar del pool del espacio (persistido en sessionStorage).
 *
 * @param {{ workplace?: string, wordlePool: { word: string, clue: string }[], onComplete: (pts: number) => void }} props
 */
function MiniWordleTriple({ workplace = 'immoralia', wordlePool, onComplete }) {
  const [pack, setPack] = useState(() => {
    const existing = readWordlePack(workplace)
    if (existing) return existing
    const configs = shufflePickThree(wordlePool)
    const initial = { configs, roundIndex: 0, pointsSoFar: 0 }
    writeWordlePack(workplace, initial)
    return initial
  })

  const cfg = pack.configs[pack.roundIndex]

  const handleRound = useCallback(
    (pts) => {
      const earned = Number(pts) || 0
      const pointsSoFar = pack.pointsSoFar + earned
      if (pack.roundIndex >= WORDLE_ROUNDS_PER_SESSION - 1) {
        clearWordlePackSession(workplace)
        onComplete(pointsSoFar)
        return
      }
      const next = { ...pack, roundIndex: pack.roundIndex + 1, pointsSoFar }
      writeWordlePack(workplace, next)
      setPack(next)
    },
    [pack, workplace, onComplete],
  )

  const roundMeta = {
    current: pack.roundIndex + 1,
    total: WORDLE_ROUNDS_PER_SESSION,
  }

  const continueLabel =
    pack.roundIndex < WORDLE_ROUNDS_PER_SESSION - 1 ? 'Siguiente palabra' : 'Continuar'

  return (
    <MiniWordle
      key={`${cfg.word}-${pack.roundIndex}`}
      workplace={workplace}
      config={cfg}
      onComplete={handleRound}
      examRoundOffset={pack.roundIndex}
      examTotalSlots={WORDLE_MAX_TRIES * WORDLE_ROUNDS_PER_SESSION}
      roundMeta={roundMeta}
      continueLabel={continueLabel}
    />
  )
}

export default MiniWordleTriple
