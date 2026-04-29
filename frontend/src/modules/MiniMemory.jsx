import { useCallback, useMemo, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { MEMORY_PTS_PER_PAIR } from '../data/workplaceMiniNewFour'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** @typedef {{ pairId: string, label: string, side: 'L'|'R' }} Card */

/** @param {{ onComplete: (pts: number) => void, pairs: { id: string, left: string, right: string }[] }} props */
function MiniMemory({ onComplete, pairs }) {
  const cards = useMemo(() => {
    /** @type {Card[]} */
    const built = []
    pairs.forEach((p) => {
      built.push({ pairId: p.id, label: p.left, side: 'L' })
      built.push({ pairId: p.id, label: p.right, side: 'R' })
    })
    return shuffle(built)
  }, [pairs])

  const [flipped, setFlipped] = useState(/** @type {number[]} */ ([]))
  const [matched, setMatched] = useState(/** @type {Record<string, boolean>} */ ({}))
  const [locked, setLocked] = useState(false)

  const matchedCount = Object.keys(matched).filter((k) => matched[k]).length / 2
  const earned = Math.floor(matchedCount) * MEMORY_PTS_PER_PAIR
  const maxPts = pairs.length * MEMORY_PTS_PER_PAIR
  const done = matchedCount >= pairs.length

  const flip = useCallback(
    (idx) => {
      if (locked || flipped.includes(idx) || matched[cards[idx].pairId]) return
      const next = [...flipped, idx]
      if (next.length === 1) {
        setFlipped(next)
        return
      }
      const [a, b] = next
      const ca = cards[a]
      const cb = cards[b]
      if (ca.pairId === cb.pairId && ca.side !== cb.side) {
        setMatched((m) => {
          const nm = { ...m, [ca.pairId]: true }
          const pairsDone = Object.keys(nm).filter((k) => nm[k]).length / 2
          if (pairsDone >= pairs.length) {
            queueMicrotask(() => onComplete(pairs.length * MEMORY_PTS_PER_PAIR))
          }
          return nm
        })
        setFlipped([])
      } else {
        setLocked(true)
        window.setTimeout(() => {
          setFlipped([])
          setLocked(false)
        }, 700)
      }
    },
    [cards, flipped, locked, matched, matchedCount, onComplete, pairs.length],
  )

  return (
    <ModuleWrapper
      title="Minijuego: Memoria"
      subtitle={`Empareja cada concepto con su pareja. ${MEMORY_PTS_PER_PAIR} pts por par. Max ${maxPts} pts.`}
    >
      <p className="mb-3 text-sm text-slate-400">
        Pares encontrados: {Math.floor(matchedCount)} / {pairs.length} · Puntos: {earned}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cards.map((c, idx) => {
          const isOpen = flipped.includes(idx) || matched[c.pairId]
          return (
            <button
              key={`${c.pairId}-${idx}`}
              type="button"
              disabled={locked || done}
              onClick={() => flip(idx)}
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
