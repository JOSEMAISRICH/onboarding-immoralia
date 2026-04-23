import { useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { MINI_POINTS, preguntasTrueFalse as defaultTrueFalse } from '../data/minijuegos'

function MiniTrueFalse({ onComplete, items = defaultTrueFalse }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hits, setHits] = useState(0)

  const maxPts = items.length * MINI_POINTS.trueFalsePerHit
  const q = items[index]
  const isLast = index === items.length - 1
  const answered = picked !== null
  const isCorrect = answered && picked === q.correct

  const choose = (value) => {
    if (picked !== null) return
    setPicked(value)
    if (value === q.correct) setHits((h) => h + 1)
  }

  const advance = () => {
    if (isLast) {
      onComplete(hits * MINI_POINTS.trueFalsePerHit)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  const earnedSoFar = hits * MINI_POINTS.trueFalsePerHit

  return (
    <ModuleWrapper
      title="Minijuego: Verdadero o falso"
      subtitle={`${MINI_POINTS.trueFalsePerHit} pts por acierto. Max ${maxPts} pts.`}
    >
      <p className="mb-2 text-sm text-slate-400">
        Pregunta {index + 1} de {items.length}
      </p>
      <div className="rounded-2xl border border-cyan-300/30 bg-slate-950/60 p-4">
        <p className="text-lg font-medium text-slate-100">{q.text}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={answered}
            onClick={() => choose(true)}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              answered
                ? picked === true
                  ? isCorrect
                    ? 'bg-emerald-500/30 text-emerald-200 ring-2 ring-emerald-400'
                    : 'bg-rose-500/30 text-rose-200 ring-2 ring-rose-400'
                  : 'opacity-40'
                : 'bg-cyan-500/20 text-cyan-100 hover:bg-cyan-500/30'
            }`}
          >
            Verdadero
          </button>
          <button
            type="button"
            disabled={answered}
            onClick={() => choose(false)}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              answered
                ? picked === false
                  ? isCorrect
                    ? 'bg-emerald-500/30 text-emerald-200 ring-2 ring-emerald-400'
                    : 'bg-rose-500/30 text-rose-200 ring-2 ring-rose-400'
                  : 'opacity-40'
                : 'bg-cyan-500/20 text-cyan-100 hover:bg-cyan-500/30'
            }`}
          >
            Falso
          </button>
        </div>
        {answered ? (
          <p className={`mt-3 text-sm font-semibold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
            {isCorrect ? `+${MINI_POINTS.trueFalsePerHit} pts` : 'Incorrecto.'}
          </p>
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">Puntos acumulados: {earnedSoFar}</p>
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

export default MiniTrueFalse
