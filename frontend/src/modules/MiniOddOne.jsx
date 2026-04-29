import { useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { getOddOneExplanation } from '../lib/questionExplain'
import { MINI_POINTS, preguntasIntruso as defaultIntruso } from '../data/minijuegos'

function MiniOddOne({ onComplete, questions = defaultIntruso }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hits, setHits] = useState(0)

  const maxOdd = questions.length * MINI_POINTS.oddPerHit
  const q = questions[index]
  const isLast = index === questions.length - 1
  const answered = picked !== null
  const correct = picked === q.oddIndex

  const choose = (optionIndex) => {
    if (answered) return
    setPicked(optionIndex)
    if (optionIndex === q.oddIndex) setHits((h) => h + 1)
  }

  const advance = () => {
    if (isLast) {
      onComplete(hits * MINI_POINTS.oddPerHit)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  const earned = hits * MINI_POINTS.oddPerHit

  return (
    <ModuleWrapper
      title="Minijuego: El intruso"
      subtitle={`Elige la opcion que NO encaja. ${MINI_POINTS.oddPerHit} pts por acierto. Max ${maxOdd} pts.`}
    >
      <p className="mb-2 text-sm text-slate-400">
        Pregunta {index + 1} de {questions.length}
      </p>
      <div className="rounded-2xl border border-cyan-300/30 bg-slate-950/60 p-4">
        <p className="text-lg font-medium text-slate-100">{q.question}</p>
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, i) => {
            const sel = picked === i
            let cls =
              'rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-3 text-left text-sm transition'
            if (answered && sel) {
              cls = correct
                ? 'rounded-xl border border-emerald-300/60 bg-emerald-300/20 px-4 py-3 text-left text-sm'
                : 'rounded-xl border border-rose-300/60 bg-rose-300/20 px-4 py-3 text-left text-sm'
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
          <div className="mt-3 space-y-2 rounded-xl border border-slate-600/50 bg-slate-900/60 p-3 text-sm leading-relaxed">
            <p className={`font-semibold ${correct ? 'text-emerald-300' : 'text-rose-300'}`}>
              {correct ? `+${MINI_POINTS.oddPerHit} pts` : '0 pts'}
            </p>
            <p className="text-slate-300">{getOddOneExplanation(q, picked, correct)}</p>
          </div>
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
            {isLast ? 'Ver resultado final' : 'Siguiente'}
          </button>
        ) : null}
      </div>
    </ModuleWrapper>
  )
}

export default MiniOddOne
