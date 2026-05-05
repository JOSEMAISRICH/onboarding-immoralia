import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { MEMORY_PTS_PER_PAIR } from '../data/workplaceMiniNewFour'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'
import { fingerprintPairs, readGameResume, writeGameResume } from '../lib/minigameResumeStorage'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** @typedef {{ pairId: string, label: string, side: 'L'|'R' }} Card */

function buildShuffledCards(pairList) {
  /** @type {Card[]} */
  const built = []
  pairList.forEach((p) => {
    built.push({ pairId: p.id, label: p.left, side: 'L' })
    built.push({ pairId: p.id, label: p.right, side: 'R' })
  })
  return shuffle(built)
}

function validateSavedCards(savedCards, pairList) {
  if (!savedCards || savedCards.length !== pairList.length * 2) return false
  const counts = {}
  for (const p of pairList) {
    counts[p.id] = { L: false, R: false }
  }
  for (const c of savedCards) {
    if (!c.pairId || (c.side !== 'L' && c.side !== 'R')) return false
    const pair = pairList.find((p) => p.id === c.pairId)
    if (!pair) return false
    if (c.side === 'L' && c.label !== pair.left) return false
    if (c.side === 'R' && c.label !== pair.right) return false
    counts[c.pairId][c.side] = true
  }
  return Object.values(counts).every((x) => x.L && x.R)
}

/** @param {{ workplace?: string, onComplete: (pts: number) => void, pairs: { id: string, left: string, right: string }[] }} props */
function MiniMemory({ workplace = 'immoralia', onComplete, pairs }) {
  const fingerprint = useMemo(() => fingerprintPairs(pairs), [pairs])
  const hydratedForFp = useRef(null)
  const completionSentRef = useRef(false)

  const [cards, setCards] = useState(() => buildShuffledCards(pairs))
  const [flipped, setFlipped] = useState(/** @type {number[]} */ ([]))
  const [matched, setMatched] = useState(/** @type {Record<string, boolean>} */ ({}))
  const [locked, setLocked] = useState(false)

  useLayoutEffect(() => {
    if (!pairs.length) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    completionSentRef.current = false
    const s = readGameResume(workplace, 'miniMemory', fingerprint)
    if (s?.cards && validateSavedCards(s.cards, pairs)) {
      setCards(s.cards)
      setMatched(typeof s.matched === 'object' && s.matched ? { ...s.matched } : {})
      setFlipped(Array.isArray(s.flipped) ? s.flipped : [])
      setLocked(Boolean(s.locked))
      return
    }
    setCards(buildShuffledCards(pairs))
    setMatched({})
    setFlipped([])
    setLocked(false)
  }, [workplace, fingerprint, pairs])

  useEffect(() => {
    if (!pairs.length || hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, 'miniMemory', fingerprint, { cards, matched, flipped, locked })
  }, [workplace, fingerprint, pairs.length, cards, matched, flipped, locked])

  /** Una entrada true por par emparejado (clave = pairId), no dos. */
  const matchedCount = Object.keys(matched).filter((k) => matched[k]).length
  const earned = matchedCount * MEMORY_PTS_PER_PAIR
  const maxPts = pairs.length * MEMORY_PTS_PER_PAIR
  const done = matchedCount >= pairs.length

  useEffect(() => {
    if (!pairs.length || hydratedForFp.current !== fingerprint) return
    if (matchedCount < pairs.length) return
    if (completionSentRef.current) return
    completionSentRef.current = true
    queueMicrotask(() => onComplete(pairs.length * MEMORY_PTS_PER_PAIR))
  }, [matchedCount, pairs.length, fingerprint, onComplete])

  const pairsMatched = useMemo(
    () => Object.keys(matched).filter((k) => matched[k]).length,
    [matched],
  )
  useReportExamQuestionProgress(Math.min(pairsMatched, pairs.length), pairs.length, pairs.length > 0)

  const flipStable = useCallback(
    (idx) => {
      if (locked || flipped.includes(idx) || matched[cards[idx]?.pairId]) return
      const next = [...flipped, idx]
      if (next.length === 1) {
        setFlipped(next)
        return
      }
      setFlipped(next)
      const [a, b] = next
      const ca = cards[a]
      const cb = cards[b]
      if (ca.pairId === cb.pairId && ca.side !== cb.side) {
        setMatched((m) => ({ ...m, [ca.pairId]: true }))
        setFlipped([])
      } else {
        setLocked(true)
        window.setTimeout(() => {
          setFlipped([])
          setLocked(false)
        }, 700)
      }
    },
    [cards, flipped, locked, matched, pairs.length],
  )

  return (
    <ModuleWrapper
      title="Minijuego: Memoria"
      subtitle={`Empareja cada concepto con su pareja. ${MEMORY_PTS_PER_PAIR} pts por par. Max ${maxPts} pts.`}
    >
      <p className="mb-3 text-sm text-slate-400">
        Pares encontrados: {matchedCount} / {pairs.length} · Puntos: {earned}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cards.map((c, idx) => {
          const isOpen = flipped.includes(idx) || matched[c.pairId]
          return (
            <button
              key={`${c.pairId}-${idx}`}
              type="button"
              disabled={locked || done}
              onClick={() => flipStable(idx)}
              className={`flex min-h-[72px] items-center justify-center rounded-xl border px-2 py-3 text-center text-sm font-semibold transition ${
                isOpen
                  ? matched[c.pairId]
                    ? 'border-emerald-400/60 bg-emerald-950/35 text-emerald-100'
                    : 'border-cyan-400/50 bg-slate-800/80 text-white'
                  : 'border-slate-600/70 bg-indigo-950/60 text-indigo-200/90 hover:border-amber-400/40'
              }`}
            >
              {isOpen ? c.label : '?'}
            </button>
          )
        })}
      </div>
      {done ? <p className="mt-4 text-center text-emerald-300">Todos los pares encontrados.</p> : null}
    </ModuleWrapper>
  )
}

export default MiniMemory
