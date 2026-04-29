import { useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { SCENARIO_PTS_PER_ROUND } from '../data/workplaceMiniNewFour'

/** @param {{ onComplete: (pts: number) => void, rounds: { id: number, situation: string, choices: { label: string, correct: boolean }[], explanation: string }[] }} props */
function MiniScenario({ onComplete, rounds }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [running, setRunning] = useState(0)
  const scoreRef = useRef(0)

  const r = rounds[index]
  const isLast = index === rounds.length - 1
  const answered = picked !== null
  const choice = picked !== null ? r.choices[picked] : null
  const correct = choice?.correct === true

  const choose = (i) => {
    if (answered) return
    setPicked(i)
    if (r.choices[i]?.correct) {
      scoreRef.current += SCENARIO_PTS_PER_ROUND
      setRunning(scoreRef.current)
    }
  }

  const advance = () => {
    if (isLast) {
      onComplete(scoreRef.current)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  const maxPts = rounds.length * SCENARIO_PTS_PER_ROUND

  return (
    <ModuleWrapper
      title="Minijuego: Escenarios"
      subtitle={`Elige la mejor reaccion. ${SCENARIO_PTS_PER_ROUND} pts por acierto. Max ${maxPts} pts.`}
    >
      <p className="mb-2 text-sm text-slate-400">
        Escenario {index + 1} de {rounds.length} · Total: {running} pts
      </p>
      <p className="mb-4 rounded-xl border border-slate-600/60 bg-slate-900/50 p-4 text-base leading-relaxed text-slate-100">
        {r.situation}
      </p>
      <div className="grid gap-2">
        {r.choices.map((c, i) => {
          const show = answered && picked === i
          const cls =
            answered && picked === i
              ? c.correct
                ? 'border-emerald-400/70 bg-emerald-950/40 text-emerald-50'
                : 'border-rose-400/60 bg-rose-950/30 text-rose-50'
              : 'border-slate-600/70 bg-slate-900/40 text-slate-200 hover:border-cyan-500/40'
          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition ${cls}`}
              onClick={() => choose(i)}
            >
              {c.label}
            </button>
          )
        })}
      </div>
      {answered ? (
        <div className="mt-4 rounded-xl border border-cyan-500/25 bg-cyan-950/20 p-3 text-sm text-cyan-100/95">
          <p className="font-semibold text-cyan-200">{correct ? 'Bien visto.' : 'No era la mejor opcion.'}</p>
          <p className="mt-1 text-slate-300">{r.explanation}</p>
          <button
            type="button"
            className="mt-3 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 px-4 py-2 text-sm font-bold text-white"
            onClick={advance}
          >
            {isLast ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      ) : null}
    </ModuleWrapper>
  )
}

export default MiniScenario
