import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from './ModuleWrapper'
import { createComboDoubleTracker, speedBonusMs } from '../lib/answerGamification'
import { getQuestionExplanation } from '../lib/questionExplain'

const TIMER_MS = 10000
const SPEED_FAST_MS = 4000
const SPEED_BONUS = 5

/**
 * Quiz secuencial con feedback inmediato.
 *
 * - `variant="full"` (default): timer, combo, bonus velocidad, envuelto en ModuleWrapper (minijuegos).
 * - `variant="embedded"`: estilo violeta compacto sin timer ni combo (fichas DocTopic).
 *
 * @param {{
 *   variant?: 'full' | 'embedded'
 *   title?: string
 *   subtitle?: string
 *   questions: { question: string, options: string[], correctIndex: number, explanation?: string }[]
 *   pointsPerCorrect?: number
 *   onComplete: (pts: number) => void
 *   childrenAfterDone?: import('react').ReactNode
 *   modoMinijuego?: boolean
 * }} props
 */
function MiniQuizPack({
  variant = 'full',
  title,
  subtitle,
  questions,
  pointsPerCorrect = 10,
  onComplete,
  childrenAfterDone = null,
  modoMinijuego = false,
}) {
  if (variant === 'embedded') {
    return (
      <EmbeddedSequentialQuiz
        questions={questions}
        pointsPerCorrect={pointsPerCorrect}
        modoMinijuego={modoMinijuego}
        onComplete={onComplete}
      />
    )
  }

  return (
    <FullSequentialQuiz
      title={title}
      subtitle={subtitle}
      questions={questions}
      pointsPerCorrect={pointsPerCorrect}
      onComplete={onComplete}
      childrenAfterDone={childrenAfterDone}
    />
  )
}

/** Fila de repaso embebida en ficha (sin timer ni combo). */
function EmbeddedSequentialQuiz({ questions, pointsPerCorrect, modoMinijuego, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  const current = questions[questionIndex]
  const hasAnswered = answers[questionIndex] !== undefined
  const isLast = questionIndex === questions.length - 1
  const selected = answers[questionIndex]
  const answerIsCorrect = selected === current.correctIndex

  const totalPoints = useMemo(() => {
    return answers.reduce((acc, ans, i) => {
      if (ans === undefined) return acc
      return acc + (ans === questions[i].correctIndex ? pointsPerCorrect : 0)
    }, 0)
  }, [answers, questions, pointsPerCorrect])

  const pick = (optionIndex) => {
    if (hasAnswered) return
    setAnswers((prev) => {
      const next = [...prev]
      while (next.length <= questionIndex) next.push(undefined)
      next[questionIndex] = optionIndex
      return next
    })
  }

  const allAnswered = questions.every((_, i) => answers[i] !== undefined)

  return (
    <div className="rounded-2xl border border-violet-300/25 bg-slate-950/55 p-4">
      <h3 className="text-sm font-semibold text-violet-200">
        {modoMinijuego ? 'Repaso con preguntas' : 'Repaso rapido en esta ficha'}
      </h3>
      <p className="mb-3 text-xs text-slate-400">
        Pregunta {questionIndex + 1} de {questions.length} · +{pointsPerCorrect} pts si aciertas
      </p>
      <p className="mb-3 text-base font-medium text-slate-100">{current.question}</p>
      <div className="grid gap-2">
        {current.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex
          let className =
            'rounded-xl border border-violet-300/30 bg-violet-500/10 px-4 py-3 text-left text-sm transition'
          if (hasAnswered && isSelected) {
            className = answerIsCorrect
              ? 'rounded-xl border border-emerald-300/60 bg-emerald-300/15 px-4 py-3 text-left text-sm'
              : 'rounded-xl border border-rose-300/60 bg-rose-300/15 px-4 py-3 text-left text-sm'
          }
          return (
            <button
              key={option}
              type="button"
              className={className}
              onClick={() => pick(optionIndex)}
              disabled={hasAnswered}
            >
              {option}
            </button>
          )
        })}
      </div>
      {hasAnswered ? (
        <p
          className={`mt-3 text-sm font-semibold ${answerIsCorrect ? 'text-emerald-300' : 'text-rose-300'}`}
        >
          {answerIsCorrect ? `+${pointsPerCorrect} pts` : '0 pts — revisa la ficha si quieres.'}
        </p>
      ) : null}
      {hasAnswered && !isLast ? (
        <button
          type="button"
          className="mt-4 rounded-xl bg-gradient-to-r from-violet-300 to-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900"
          onClick={() => setQuestionIndex((i) => i + 1)}
        >
          Siguiente
        </button>
      ) : null}
      {hasAnswered && isLast && allAnswered ? (
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900"
          onClick={() => onComplete(totalPoints)}
        >
          {modoMinijuego
            ? `Volver (${totalPoints} pts en esta ficha)`
            : `Volver al indice (${totalPoints} pts en esta ficha)`}
        </button>
      ) : null}
    </div>
  )
}

function FullSequentialQuiz({ title, subtitle, questions, pointsPerCorrect, onComplete, childrenAfterDone }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [runningTotal, setRunningTotal] = useState(0)
  const [lastDetail, setLastDetail] = useState(null)
  const [timerLeft, setTimerLeft] = useState(TIMER_MS)
  /** @type {React.MutableRefObject<number>} */
  const startRef = useRef(0)
  const comboRef = useRef(createComboDoubleTracker())

  const current = questions[questionIndex]
  const hasAnswered = answers[questionIndex] !== undefined
  const isLast = questionIndex === questions.length - 1
  const selected = answers[questionIndex]
  const answerIsCorrect = selected === current.correctIndex

  useLayoutEffect(() => {
    startRef.current = Date.now()
  }, [questionIndex])

  useEffect(() => {
    setTimerLeft(TIMER_MS)
    setLastDetail(null)
  }, [questionIndex])

  useEffect(() => {
    if (hasAnswered) return undefined
    const t = window.setInterval(() => {
      const elapsed = Date.now() - startRef.current
      setTimerLeft(Math.max(0, TIMER_MS - elapsed))
    }, 80)
    return () => window.clearInterval(t)
  }, [hasAnswered, questionIndex])

  const barPct = Math.min(100, Math.round((timerLeft / TIMER_MS) * 100))

  const pick = (optionIndex) => {
    if (hasAnswered) return
    /* eslint-disable-next-line react-hooks/purity -- elapsed time in click handler */
    const elapsed = Date.now() - startRef.current
    const ok = optionIndex === current.correctIndex
    const { multiplier } = comboRef.current.record(ok)
    if (ok) {
      const base = pointsPerCorrect * multiplier
      const bonus = speedBonusMs(elapsed, { fastMs: SPEED_FAST_MS, bonusPts: SPEED_BONUS })
      setRunningTotal((t) => t + base + bonus)
      setLastDetail({ base, multiplier, bonus })
    } else {
      setLastDetail(null)
    }
    setAnswers((prev) => {
      const next = [...prev]
      while (next.length <= questionIndex) next.push(undefined)
      next[questionIndex] = optionIndex
      return next
    })
  }

  const advance = () => setQuestionIndex((i) => i + 1)

  const allAnswered = questions.every((_, i) => answers[i] !== undefined)

  return (
    <ModuleWrapper title={title} subtitle={subtitle}>
      <p className="mb-2 text-sm text-slate-300">
        Pregunta {questionIndex + 1} de {questions.length} · Puntos: {runningTotal}
      </p>

      <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-800/90 ring-1 ring-amber-500/20">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-[width] duration-75"
          style={{ width: `${barPct}%` }}
        />
      </div>

      <div className="rounded-2xl border border-amber-300/30 bg-slate-950/60 p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-100">{current.question}</h3>
        <div className="grid gap-2">
          {current.options.map((option, optionIndex) => {
            const isSelected = selected === optionIndex
            let className =
              'rounded-xl border border-amber-300/35 bg-amber-500/10 px-4 py-3 text-left text-sm transition'
            if (hasAnswered && isSelected) {
              className = answerIsCorrect
                ? 'rounded-xl border border-emerald-300/60 bg-emerald-300/20 px-4 py-3 text-left text-sm'
                : 'rounded-xl border border-rose-300/60 bg-rose-300/20 px-4 py-3 text-left text-sm'
            }
            return (
              <button
                key={option}
                type="button"
                className={className}
                onClick={() => pick(optionIndex)}
                disabled={hasAnswered}
              >
                {option}
              </button>
            )
          })}
        </div>
        {hasAnswered ? (
          <div className="mt-4 space-y-2 rounded-xl border border-slate-600/50 bg-slate-900/60 p-3 text-sm leading-relaxed">
            {answerIsCorrect && lastDetail ? (
              <p className="font-semibold text-emerald-300">
                +{lastDetail.base} pts (combo x{lastDetail.multiplier})
                {lastDetail.bonus > 0 ? ` + ${lastDetail.bonus} velocidad` : ''}
              </p>
            ) : (
              <p className="font-semibold text-rose-300">0 pts en esta — sigue.</p>
            )}
            <p className="text-slate-300">{getQuestionExplanation(current, answerIsCorrect)}</p>
          </div>
        ) : null}
      </div>

      {hasAnswered && !isLast ? (
        <button
          type="button"
          className="mt-4 rounded-xl bg-gradient-to-r from-amber-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900"
          onClick={advance}
        >
          Siguiente
        </button>
      ) : null}

      {hasAnswered && isLast ? (
        <div className="mt-4 space-y-4">
          {childrenAfterDone}
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900"
            onClick={() => onComplete(runningTotal)}
            disabled={!allAnswered}
          >
            Terminar minijuego ({runningTotal} pts)
          </button>
        </div>
      ) : null}
    </ModuleWrapper>
  )
}

export default MiniQuizPack
