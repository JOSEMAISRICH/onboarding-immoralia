import { useEffect, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { createComboDoubleTracker, speedBonusMs } from '../lib/answerGamification'
import { getTrueFalseExplanation } from '../lib/questionExplain'
import { MINI_POINTS, preguntasTrueFalse as defaultTrueFalse } from '../data/minijuegos'

const BASE = MINI_POINTS.trueFalsePerHit
const TIMER_MS = 10000
const SPEED_FAST_MS = 4000
const SPEED_BONUS = 5

function MiniTrueFalse({ onComplete, items = defaultTrueFalse }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [runningTotal, setRunningTotal] = useState(0)
  const [lastDetail, setLastDetail] = useState(null)
  const [timerLeft, setTimerLeft] = useState(TIMER_MS)
  const startRef = useRef(Date.now())
  const comboRef = useRef(createComboDoubleTracker())

  const maxPts = items.length * BASE + items.length * SPEED_BONUS
  const q = items[index]
  const isLast = index === items.length - 1
  const answered = picked !== null
  const isCorrect = answered && picked === q.correct

  useEffect(() => {
    startRef.current = Date.now()
    setTimerLeft(TIMER_MS)
    setLastDetail(null)
  }, [index])

  useEffect(() => {
    if (answered) return undefined
    const t = window.setInterval(() => {
      const elapsed = Date.now() - startRef.current
      setTimerLeft(Math.max(0, TIMER_MS - elapsed))
    }, 80)
    return () => window.clearInterval(t)
  }, [answered, index])

  const barPct = Math.min(100, Math.round((timerLeft / TIMER_MS) * 100))

  const choose = (value) => {
    if (picked !== null) return
    setPicked(value)
    const elapsed = Date.now() - startRef.current
    const ok = value === q.correct
    const { multiplier } = comboRef.current.record(ok)
    if (ok) {
      const base = BASE * multiplier
      const bonus = speedBonusMs(elapsed, { fastMs: SPEED_FAST_MS, bonusPts: SPEED_BONUS })
      setRunningTotal((t) => t + base + bonus)
      setLastDetail({ base, multiplier, bonus })
    } else {
      setLastDetail(null)
    }
  }

  const advance = () => {
    if (isLast) {
      onComplete(runningTotal)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  return (
    <ModuleWrapper
      title="Minijuego: Verdadero o falso"
      subtitle={`${BASE} pts base por acierto, combo x2 tras 3 seguidas, hasta +${SPEED_BONUS} por velocidad (<4s).`}
    >
      <p className="mb-2 text-sm text-slate-400">
        Pregunta {index + 1} de {items.length} · Total: {runningTotal} pts
      </p>

      <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-800/90 ring-1 ring-cyan-500/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-[width] duration-75"
          style={{ width: `${barPct}%` }}
        />
      </div>

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
          <div className="mt-4 space-y-2 rounded-xl border border-slate-600/50 bg-slate-900/60 p-3 text-sm leading-relaxed">
            {isCorrect && lastDetail ? (
              <p className="font-semibold text-emerald-300">
                +{lastDetail.base} pts (combo x{lastDetail.multiplier})
                {lastDetail.bonus > 0 ? ` + ${lastDetail.bonus} velocidad` : ''}
              </p>
            ) : (
              <p className="font-semibold text-rose-300">0 pts</p>
            )}
            <p className="text-slate-300">{getTrueFalseExplanation(q, isCorrect)}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">Puntos acumulados: {runningTotal}</p>
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
