import { useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { getMaxModulo1Registros } from '../lib/workplacePack'
import { normalizeWorkplaceId } from '../data/workplace'

/**
 * Modulo 1 para espacios que no usan fichas DocTopic (general, immedia, imcontent).
 * @param {{ workplace: string, items: Array<{ id: string, title: string, question: string, options: string[], correctIndex: number }>, onComplete: (points: number) => void }} props
 */
function MiniModulo1Repaso({ workplace, items, onComplete }) {
  const wp = normalizeWorkplaceId(workplace)
  const maxPts = useMemo(() => getMaxModulo1Registros(wp), [wp])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hits, setHits] = useState(0)
  const hitsRef = useRef(0)

  const q = items[index]
  const isLast = index === items.length - 1
  const answered = picked !== null
  const correct = picked === q.correctIndex

  const choose = (optIdx) => {
    if (answered) return
    setPicked(optIdx)
    if (optIdx === q.correctIndex) {
      hitsRef.current += 1
      setHits(hitsRef.current)
    }
  }

  const advance = () => {
    if (isLast) {
      onComplete(hitsRef.current * 10)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  const earned = hitsRef.current * 10

  return (
    <ModuleWrapper
      title="Modulo 1: Repaso de tu teoria"
      subtitle={`Preguntas breves alineadas a tu espacio. 10 pts por acierto. Maximo ${maxPts} pts.`}
    >
      <p className="mb-2 text-sm text-slate-400">
        Pregunta {index + 1} de {items.length}
        {q.title ? (
          <span className="ml-2 rounded-md bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300">{q.title}</span>
        ) : null}
      </p>
      <div className="rounded-2xl border border-cyan-300/30 bg-slate-950/60 p-4">
        <p className="text-lg font-medium text-slate-100">{q.question}</p>
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, optIdx) => {
            const sel = picked === optIdx
            let cls =
              'rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-3 text-left text-sm transition'
            if (answered) {
              if (optIdx === q.correctIndex) {
                cls = 'rounded-xl border border-emerald-300/60 bg-emerald-300/20 px-4 py-3 text-left text-sm'
              } else if (sel) {
                cls = 'rounded-xl border border-rose-300/60 bg-rose-300/20 px-4 py-3 text-left text-sm'
              } else {
                cls = 'rounded-xl border border-cyan-300/20 bg-slate-900/40 px-4 py-3 text-left text-sm opacity-60'
              }
            }
            return (
              <button
                key={opt}
                type="button"
                className={cls}
                disabled={answered}
                onClick={() => choose(optIdx)}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {answered ? (
          <p className={`mt-3 text-sm font-semibold ${correct ? 'text-emerald-300' : 'text-rose-300'}`}>
            {correct ? '+10 pts' : 'Incorrecto.'}
          </p>
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">
          Puntos: {earned} / {maxPts}
        </p>
        {answered ? (
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900"
            onClick={advance}
          >
            {isLast ? 'Siguiente minijuego' : 'Siguiente'}
          </button>
        ) : null}
      </div>
    </ModuleWrapper>
  )
}

export default MiniModulo1Repaso
