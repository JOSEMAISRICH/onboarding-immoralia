import { useEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { createComboDoubleTracker, speedBonusMs } from '../lib/answerGamification'
import { getQuestionExplanation } from '../lib/questionExplain'
import { preguntas as preguntasDefault } from '../data/preguntas'

const BASE_PER_QUESTION = 20
const TIMER_MS = 10000
const SPEED_FAST_MS = 4000
const SPEED_BONUS = 5

function Quiz({ onComplete, questions: questionsProp = preguntasDefault }) {
  const questions = questionsProp
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewStep, setReviewStep] = useState(0)
  const [runningTotal, setRunningTotal] = useState(0)
  const [lastBreakdown, setLastBreakdown] = useState(null)
  const [timerLeft, setTimerLeft] = useState(TIMER_MS)
  const questionStartRef = useRef(Date.now())
  const comboRef = useRef(createComboDoubleTracker())

  const currentQuestion = questions[questionIndex]
  const hasAnswered = answers[questionIndex] !== undefined
  const isLast = questionIndex === questions.length - 1
  const allAnswered = questions.every((_, i) => answers[i] !== undefined)

  useEffect(() => {
    questionStartRef.current = Date.now()
    setTimerLeft(TIMER_MS)
  }, [questionIndex])

  useEffect(() => {
    if (hasAnswered || reviewOpen) return undefined
    const t = window.setInterval(() => {
      const elapsed = Date.now() - questionStartRef.current
      setTimerLeft(Math.max(0, TIMER_MS - elapsed))
    }, 80)
    return () => window.clearInterval(t)
  }, [hasAnswered, questionIndex, reviewOpen])

  const wrongIndices = useMemo(() => {
    return questions
      .map((_, i) => i)
      .filter((i) => answers[i] !== undefined && answers[i] !== questions[i].correctAnswer)
  }, [answers, questions])

  const selectAnswer = (optionIndex) => {
    if (answers[questionIndex] !== undefined) return
    const elapsed = Date.now() - questionStartRef.current
    const isCorrect = optionIndex === currentQuestion.correctAnswer
    const { multiplier } = comboRef.current.record(isCorrect)
    let add = 0
    let breakdown = null
    if (isCorrect) {
      const base = BASE_PER_QUESTION * multiplier
      const bonus = speedBonusMs(elapsed, { fastMs: SPEED_FAST_MS, bonusPts: SPEED_BONUS })
      add = base + bonus
      breakdown = { base, multiplier, bonus, elapsed }
    } else {
      breakdown = { wrong: true, elapsed }
    }
    setLastBreakdown(breakdown)
    setRunningTotal((t) => t + add)
    setAnswers((current) => {
      const next = [...current]
      while (next.length <= questionIndex) next.push(undefined)
      next[questionIndex] = optionIndex
      return next
    })
  }

  const selectedOption = answers[questionIndex]
  const answerIsCorrect = selectedOption === currentQuestion.correctAnswer

  const startReview = () => {
    setReviewOpen(true)
    setReviewStep(0)
  }

  const reviewIndex = wrongIndices[reviewStep]
  const reviewQuestion = reviewIndex !== undefined ? questions[reviewIndex] : null

  const barPct = Math.min(100, Math.round((timerLeft / TIMER_MS) * 100))

  return (
    <ModuleWrapper
      title="Minijuego 3: Gran quiz (tu espacio)"
      subtitle="20 pts base por acierto, combo x2 tras 3 seguidas, y hasta +5 por velocidad (<4s). Barra opcional 10s."
    >
      {!reviewOpen ? (
        <>
          <p className="mb-2 text-sm text-slate-300">
            Pregunta {questionIndex + 1} de {questions.length} · Total: {runningTotal} pts
          </p>

          <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-800/90 ring-1 ring-cyan-500/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-[width] duration-75"
              style={{ width: `${barPct}%` }}
            />
          </div>
          <p className="mb-4 text-xs text-slate-500">Barra de ritmo (10s): solo afecta al bonus de velocidad.</p>

          <div className="rounded-2xl border border-cyan-300/30 bg-slate-950/60 p-4">
            <h3 className="mb-4 text-lg font-semibold">{currentQuestion.question}</h3>
            <div className="grid gap-2">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedOption === optionIndex
                let className =
                  'rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-3 text-left text-sm transition'
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
                    onClick={() => selectAnswer(optionIndex)}
                    disabled={hasAnswered}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          {hasAnswered ? (
            <div className="mt-4 space-y-2 rounded-xl border border-slate-600/50 bg-slate-900/60 p-4 text-sm leading-relaxed">
              {answerIsCorrect ? (
                <p className="font-semibold text-emerald-300">
                  {(lastBreakdown?.bonus || 0) > 0
                    ? `+${lastBreakdown.base} pts (combo x${lastBreakdown.multiplier}) + ${lastBreakdown.bonus} velocidad`
                    : `+${lastBreakdown?.base ?? BASE_PER_QUESTION} pts (combo x${lastBreakdown?.multiplier ?? 1})`}
                </p>
              ) : (
                <p className="font-semibold text-rose-300">0 pts en esta — te explicamos por qué.</p>
              )}
              <p className="text-slate-300">
                {getQuestionExplanation(currentQuestion, answerIsCorrect)}
              </p>
            </div>
          ) : null}

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-200">Puntos del quiz: {runningTotal}</p>
            {!isLast ? (
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
                disabled={!hasAnswered}
                onClick={() => setQuestionIndex((current) => current + 1)}
              >
                Siguiente pregunta
              </button>
            ) : (
              <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3">
                {allAnswered && wrongIndices.length > 0 ? (
                  <button
                    type="button"
                    className="rounded-xl border border-amber-300/50 bg-amber-300/15 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/25"
                    onClick={startReview}
                  >
                    Repasar falladas (sin puntos extra)
                  </button>
                ) : null}
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={!allAnswered}
                  onClick={() => onComplete(runningTotal)}
                >
                  Continuar al puzzle
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-amber-300/35 bg-amber-300/10 p-4">
          <h3 className="text-lg font-semibold text-amber-100">Repaso de preguntas falladas</h3>
          <p className="mt-1 text-sm text-amber-100/80">
            Practica sin cambiar tu puntuacion ya guardada.
          </p>
          {reviewQuestion ? (
            <div className="mt-4 rounded-xl border border-slate-600/50 bg-slate-950/60 p-4 text-left">
              <p className="font-medium text-slate-100">{reviewQuestion.question}</p>
              <p className="mt-3 text-sm text-emerald-300">
                Respuesta correcta:{' '}
                <strong>{reviewQuestion.options[reviewQuestion.correctAnswer]}</strong>
              </p>
              <p className="mt-3 text-sm text-slate-400">
                {getQuestionExplanation(reviewQuestion, true)}
              </p>
            </div>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {reviewStep > 0 ? (
              <button
                type="button"
                className="rounded-xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100"
                onClick={() => setReviewStep((s) => Math.max(0, s - 1))}
              >
                Anterior
              </button>
            ) : null}
            {reviewStep < wrongIndices.length - 1 ? (
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900"
                onClick={() => setReviewStep((s) => s + 1)}
              >
                Siguiente fallo
              </button>
            ) : (
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900"
                onClick={() => setReviewOpen(false)}
              >
                Cerrar repaso
              </button>
            )}
          </div>
        </div>
      )}

      {reviewOpen ? (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="text-sm text-slate-400 underline hover:text-slate-200"
            onClick={() => setReviewOpen(false)}
          >
            Volver al quiz
          </button>
        </div>
      ) : null}
    </ModuleWrapper>
  )
}

export default Quiz
