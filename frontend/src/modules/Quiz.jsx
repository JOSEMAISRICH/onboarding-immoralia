import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { createComboDoubleTracker, speedBonusMs } from '../lib/answerGamification'
import { getQuestionExplanation } from '../lib/questionExplain'
import { preguntas as preguntasDefault } from '../data/preguntas'
import { fingerprintQuestions, readGameResume, writeGameResume } from '../lib/minigameResumeStorage'
import { markExamQuestionSeen } from '../lib/examQuestionSelection'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'

const BASE_PER_QUESTION = 20
const TIMER_MS = 10000
const SPEED_FAST_MS = 4000
const SPEED_BONUS = 5

function normalizeAnswers(arr, len) {
  if (!Array.isArray(arr) || len <= 0) return []
  const out = []
  for (let i = 0; i < len; i += 1) out[i] = arr[i]
  return out
}

function Quiz({
  workplace = 'immoralia',
  resumeModuleKey = 'quiz',
  onComplete,
  questions: questionsProp = preguntasDefault,
}) {
  const questions = questionsProp
  const fingerprint = useMemo(() => fingerprintQuestions(questions), [questions])
  const hydratedForFp = useRef(null)

  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewStep, setReviewStep] = useState(0)
  const [runningTotal, setRunningTotal] = useState(0)
  const [lastBreakdown, setLastBreakdown] = useState(null)
  const [timerLeft, setTimerLeft] = useState(TIMER_MS)
  const questionStartRef = useRef(Date.now())
  const comboRef = useRef(createComboDoubleTracker(null))
  const answersRef = useRef(answers)
  answersRef.current = answers

  useReportExamQuestionProgress(questionIndex, questions.length, !reviewOpen)

  useLayoutEffect(() => {
    if (!questions.length) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(workplace, resumeModuleKey, fingerprint)
    if (!s) return
    const qi =
      typeof s.questionIndex === 'number'
        ? Math.max(0, Math.min(s.questionIndex, questions.length - 1))
        : 0
    setQuestionIndex(qi)
    setAnswers(normalizeAnswers(s.answers, questions.length))
    setReviewOpen(Boolean(s.reviewOpen))
    setReviewStep(typeof s.reviewStep === 'number' ? s.reviewStep : 0)
    setRunningTotal(typeof s.runningTotal === 'number' ? s.runningTotal : 0)
    comboRef.current = createComboDoubleTracker(s.combo ?? null)
  }, [workplace, resumeModuleKey, fingerprint, questions])

  const currentQuestion = questions[questionIndex]
  const hasAnswered = answers[questionIndex] !== undefined
  const isLast = questionIndex === questions.length - 1
  const allAnswered = questions.every((_, i) => answers[i] !== undefined)

  useEffect(() => {
    questionStartRef.current = Date.now()
    setTimerLeft(TIMER_MS)
  }, [questionIndex])

  useEffect(() => {
    if (!questions.length) return
    if (hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, resumeModuleKey, fingerprint, {
      questionIndex,
      answers,
      runningTotal,
      reviewOpen,
      reviewStep,
      combo: comboRef.current.snapshot(),
    })
  }, [
    workplace,
    resumeModuleKey,
    fingerprint,
    questions.length,
    questionIndex,
    answers,
    runningTotal,
    reviewOpen,
    reviewStep,
  ])

  useEffect(() => {
    if (hasAnswered || reviewOpen) return undefined
    const t = window.setInterval(() => {
      const elapsed = Date.now() - questionStartRef.current
      setTimerLeft(Math.max(0, TIMER_MS - elapsed))
    }, 80)
    return () => window.clearInterval(t)
  }, [hasAnswered, questionIndex, reviewOpen])

  useEffect(() => {
    if (reviewOpen || !questions.length) return undefined
    const qi = questionIndex
    const cq = questions[qi]
    if (!cq) return undefined
    const id = window.setTimeout(() => {
      if (answersRef.current[qi] !== undefined) return
      const wrongIdx = cq.options.length <= 1 ? 0 : (cq.correctAnswer + 1) % cq.options.length
      comboRef.current.record(false)
      setLastBreakdown({ wrong: true, timedOut: true, elapsed: TIMER_MS })
      markExamQuestionSeen(workplace, cq.question)
      setAnswers((current) => {
        if (current[qi] !== undefined) return current
        const next = [...current]
        while (next.length <= qi) next.push(undefined)
        next[qi] = wrongIdx
        return next
      })
    }, TIMER_MS)
    return () => window.clearTimeout(id)
  }, [questionIndex, reviewOpen, questions, workplace])

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
    markExamQuestionSeen(workplace, currentQuestion.question)
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

  if (!questions.length || !currentQuestion) {
    return (
      <ModuleWrapper title="Minijuego 3: Gran quiz (tu espacio)" subtitle="Cargando preguntas…">
        <p className="text-sm text-slate-600">Preparando el quiz…</p>
      </ModuleWrapper>
    )
  }

  return (
    <ModuleWrapper
      title="Minijuego 3: Gran quiz (tu espacio)"
      subtitle="20 pts base por acierto, combo x2 tras 3 seguidas, y hasta +5 por velocidad (<4s). Barra opcional 10s."
    >
      {!reviewOpen ? (
        <>
          <p className="mb-2 text-sm text-slate-600">
            Pregunta {questionIndex + 1} de {questions.length} · Total: {runningTotal} pts
          </p>

          <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-200 ring-1 ring-blue-200/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500 transition-[width] duration-75"
              style={{ width: `${barPct}%` }}
            />
          </div>
          <p className="mb-4 text-xs text-slate-500">
            Barra 10s: cuando llega a cero se marca una respuesta incorrecta automaticamente (0 pts en esa pregunta).
          </p>

          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-white p-4 shadow-inner shadow-blue-100/50">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">{currentQuestion.question}</h3>
            <div className="grid gap-2">
              {currentQuestion.options.map((option, optionIndex) => {
                const isSelected = selectedOption === optionIndex
                let className =
                  'rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-800 transition hover:border-blue-300 hover:bg-blue-50/80'
                if (hasAnswered) {
                  if (isSelected) {
                    className = answerIsCorrect
                      ? 'rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-950'
                      : 'rounded-xl border border-rose-400 bg-rose-50 px-4 py-3 text-left text-sm text-rose-950'
                  } else if (optionIndex === currentQuestion.correctAnswer) {
                    className =
                      'rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-950'
                  } else {
                    className =
                      'rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left text-sm text-slate-400 opacity-80'
                  }
                }
                return (
                  <button
                    key={`quiz-${questionIndex}-opt-${optionIndex}`}
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
            <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              {answerIsCorrect ? (
                <p className="font-semibold text-emerald-700">
                  {(lastBreakdown?.bonus || 0) > 0
                    ? `+${lastBreakdown.base} pts (combo x${lastBreakdown.multiplier}) + ${lastBreakdown.bonus} velocidad`
                    : `+${lastBreakdown?.base ?? BASE_PER_QUESTION} pts (combo x${lastBreakdown?.multiplier ?? 1})`}
                </p>
              ) : (
                <p className="font-semibold text-rose-700">0 pts en esta — te explicamos por qué.</p>
              )}
              <p>{getQuestionExplanation(currentQuestion, answerIsCorrect)}</p>
            </div>
          ) : null}

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-slate-700">Puntos del quiz: {runningTotal}</p>
            {!isLast ? (
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
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
                    className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-100"
                    onClick={startReview}
                  >
                    Repasar falladas (sin puntos extra)
                  </button>
                ) : null}
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
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
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/80 p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-amber-950">Repaso de preguntas falladas</h3>
          <p className="mt-1 text-sm text-amber-900/85">
            Practica sin cambiar tu puntuacion ya guardada.
          </p>
          {reviewQuestion ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm">
              <p className="font-medium text-slate-900">{reviewQuestion.question}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-800">
                Respuesta correcta:{' '}
                <strong>{reviewQuestion.options[reviewQuestion.correctAnswer]}</strong>
              </p>
              <p className="mt-3 text-sm text-slate-600">{getQuestionExplanation(reviewQuestion, true)}</p>
            </div>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {reviewStep > 0 ? (
              <button
                type="button"
                className="rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:bg-blue-50"
                onClick={() => setReviewStep((s) => Math.max(0, s - 1))}
              >
                Anterior
              </button>
            ) : null}
            {reviewStep < wrongIndices.length - 1 ? (
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
                onClick={() => setReviewStep((s) => s + 1)}
              >
                Siguiente fallo
              </button>
            ) : (
              <button
                type="button"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
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
            className="text-sm font-semibold text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
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
