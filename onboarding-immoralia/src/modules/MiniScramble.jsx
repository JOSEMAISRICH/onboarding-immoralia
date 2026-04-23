import { useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { MINI_POINTS, palabrasRevueltas as defaultRounds } from '../data/minijuegos'

function MiniScramble({ onComplete, rounds = defaultRounds }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hits, setHits] = useState(0)

  const maxScr = rounds.length * MINI_POINTS.scramblePerHit
  const q = rounds[index]
  const isLast = index === rounds.length - 1
  const answered = picked !== null
  const correct = picked === q.correctIndex

  const choose = (optionIndex) => {
    if (answered) return
    setPicked(optionIndex)
    if (optionIndex === q.correctIndex) setHits((h) => h + 1)
  }

  const advance = () => {
    if (isLast) {
      onComplete(hits * MINI_POINTS.scramblePerHit)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  const earned = hits * MINI_POINTS.scramblePerHit

  return (
    <ModuleWrapper
      title="Minijuego: Palabra revuelta"
      subtitle={`Adivina la herramienta o concepto. ${MINI_POINTS.scramblePerHit} pts por acierto. Max ${maxScr} pts.`}
    >
      <p className="mb-2 text-sm text-slate-400">
        Ronda {index + 1} de {rounds.length}
      </p>
      <div className="rounded-2xl border border-cyan-300/30 bg-slate-950/60 p-4">
        <p className="text-sm text-slate-400">{q.hint}</p>
        <p className="mt-2 font-mono text-2xl font-bold tracking-widest text-cyan-200">{q.scrambled}</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const sel = picked === i
            let cls =
              'rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-3 py-3 text-left text-sm transition'
            if (answered && sel) {
              cls = correct
                ? 'rounded-xl border border-emerald-300/60 bg-emerald-300/20 px-3 py-3 text-left text-sm'
                : 'rounded-xl border border-rose-300/60 bg-rose-300/20 px-3 py-3 text-left text-sm'
            }
            return (
              <button
                key={opt}
                type="button"
                disabled={answered}
                className={cls}
                onClick={() => choose(i)}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {answered ? (
          <p className={`mt-3 text-sm font-semibold ${correct ? 'text-emerald-300' : 'text-rose-300'}`}>
            {correct ? `+${MINI_POINTS.scramblePerHit} pts` : 'Incorrecto.'}
          </p>
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">Puntos: {earned}</p>
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

export default MiniScramble
