import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from './ModuleWrapper'
import { createComboDoubleTracker, speedBonusMs } from '../lib/answerGamification'
import { getQuestionExplanation } from '../lib/questionExplain'
import { fingerprintQuestions, readGameResume, writeGameResume } from '../lib/minigameResumeStorage'
import { markExamQuestionSeen } from '../lib/examQuestionSelection'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'

const DEFAULT_TIMER_MS = 10000
const DEFAULT_SPEED_FAST_MS = 4000
const SPEED_BONUS = 5

/**
 * @param {{
 *   variant?: 'full' | 'embedded'
 *   title?: string
 *   subtitle?: string
 *   questions: { question: string, options: string[], correctIndex: number, explanation?: string }[]
 *   pointsPerCorrect?: number
 *   onComplete: (pts: number) => void
 *   childrenAfterDone?: import('react').ReactNode
 *   modoMinijuego?: boolean
 *   resumeWorkplace?: string
 *   resumeModuleKey?: string
 *   trackExamProgress?: boolean
 *   timerMs?: number
 *   speedFastMs?: number
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
  resumeWorkplace,
  resumeModuleKey,
  trackExamProgress = false,
  timerMs = DEFAULT_TIMER_MS,
  speedFastMs = DEFAULT_SPEED_FAST_MS,
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
      resumeWorkplace={resumeWorkplace}
      resumeModuleKey={resumeModuleKey}
      trackExamProgress={trackExamProgress}
      timerMs={timerMs}
      speedFastMs={speedFastMs}
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
    <div className="rounded-2xl border border-blue-200 bg-white p-4 shadow-sm shadow-blue-100/80">
      <h3 className="text-sm font-semibold text-blue-900">
        {modoMinijuego ? 'Repaso con preguntas' : 'Repaso rapido en esta ficha'}
      </h3>
      <p className="mb-3 text-xs text-slate-500">
        Pregunta {questionIndex + 1} de {questions.length} · +{pointsPerCorrect} pts si aciertas
      </p>
      <p className="mb-3 text-base font-medium text-slate-900">{current.question}</p>
      <div className="grid gap-2">
        {current.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex
          let className =
            'rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-800 transition hover:border-blue-300 hover:bg-blue-50/90'
          if (hasAnswered && isSelected) {
            className = answerIsCorrect
              ? 'rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-950'
              : 'rounded-xl border border-rose-400 bg-rose-50 px-4 py-3 text-left text-sm text-rose-950'
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
          className={`mt-3 text-sm font-semibold ${answerIsCorrect ? 'text-emerald-700' : 'text-rose-700'}`}
        >
          {answerIsCorrect ? `+${pointsPerCorrect} pts` : '0 pts — revisa la ficha si quieres.'}
        </p>
      ) : null}
      {hasAnswered && !isLast ? (
        <button
          type="button"
          className="mt-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm"
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

function normalizeAnswersMini(arr, len) {
  if (!Array.isArray(arr) || len <= 0) return []
  const out = []
  for (let i = 0; i < len; i += 1) out[i] = arr[i]
  return out
}

function FullSequentialQuiz({
  title,
  subtitle,
  questions,
  pointsPerCorrect,
  onComplete,
  childrenAfterDone,
  resumeWorkplace,
  resumeModuleKey,
  trackExamProgress = false,
  timerMs = DEFAULT_TIMER_MS,
  speedFastMs = DEFAULT_SPEED_FAST_MS,
}) {
  const fingerprint = useMemo(() => fingerprintQuestions(questions), [questions])
  const hydratedForFp = useRef(null)
  const persist =
    typeof resumeWorkplace === 'string' &&
    resumeWorkplace.length > 0 &&
    typeof resumeModuleKey === 'string' &&
    resumeModuleKey.length > 0

  const workplaceForSeen = persist ? resumeWorkplace : ''

  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [runningTotal, setRunningTotal] = useState(0)
  const [lastDetail, setLastDetail] = useState(null)
  const [timerLeft, setTimerLeft] = useState(timerMs)
  /** @type {React.MutableRefObject<number>} */
  const startRef = useRef(0)
  const comboRef = useRef(createComboDoubleTracker(null))
  const answersRef = useRef([])

  useLayoutEffect(() => {
    answersRef.current = answers
  }, [answers])

  useReportExamQuestionProgress(questionIndex, questions.length, Boolean(trackExamProgress))

  useLayoutEffect(() => {
    if (!persist || !questions.length) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(resumeWorkplace, resumeModuleKey, fingerprint)
    if (!s) return
    const qi =
      typeof s.questionIndex === 'number'
        ? Math.max(0, Math.min(s.questionIndex, questions.length - 1))
        : 0
    setQuestionIndex(qi)
    setAnswers(normalizeAnswersMini(s.answers, questions.length))
    setRunningTotal(typeof s.runningTotal === 'number' ? s.runningTotal : 0)
    comboRef.current = createComboDoubleTracker(s.combo ?? null)
  }, [persist, resumeWorkplace, resumeModuleKey, fingerprint, questions])

  const current = questions[questionIndex]
  const hasAnswered = answers[questionIndex] !== undefined
  const isLast = questionIndex === questions.length - 1
  const selected = answers[questionIndex]
  const answerIsCorrect = Boolean(current && selected === current.correctIndex)

  useLayoutEffect(() => {
    startRef.current = Date.now()
  }, [questionIndex])

  useEffect(() => {
    setTimerLeft(timerMs)
    setLastDetail(null)
  }, [questionIndex, timerMs])

  useEffect(() => {
    if (!persist || !questions.length) return
    if (hydratedForFp.current !== fingerprint) return
    writeGameResume(resumeWorkplace, resumeModuleKey, fingerprint, {
      questionIndex,
      answers,
      runningTotal,
      combo: comboRef.current.snapshot(),
    })
  }, [
    persist,
    resumeWorkplace,
    resumeModuleKey,
    fingerprint,
    questions.length,
    questionIndex,
    answers,
    runningTotal,
  ])

  useEffect(() => {
    if (hasAnswered) return undefined
    const t = window.setInterval(() => {
      const elapsed = Date.now() - startRef.current
      setTimerLeft(Math.max(0, timerMs - elapsed))
    }, 80)
    return () => window.clearInterval(t)
  }, [hasAnswered, questionIndex, timerMs])

  useEffect(() => {
    if (hasAnswered || !current) return undefined
    const qi = questionIndex
    const cq = questions[qi]
    if (!cq?.question) return undefined
    const id = window.setTimeout(() => {
      if (answersRef.current[qi] !== undefined) return
      comboRef.current.record(false)
      if (workplaceForSeen) markExamQuestionSeen(workplaceForSeen, cq.question)
      const wrongIdx = cq.options.length <= 1 ? 0 : (cq.correctIndex + 1) % cq.options.length
      setLastDetail(null)
      setAnswers((prev) => {
        if (prev[qi] !== undefined) return prev
        const next = [...prev]
        while (next.length <= qi) next.push(undefined)
        next[qi] = wrongIdx
        return next
      })
    }, timerMs)
    return () => window.clearTimeout(id)
  }, [questionIndex, hasAnswered, current, questions, workplaceForSeen, timerMs])

  const barPct = Math.min(100, Math.round((timerLeft / timerMs) * 100))

  const pick = (optionIndex) => {
    if (!current || hasAnswered) return
    /* eslint-disable-next-line react-hooks/purity -- elapsed time in click handler */
    const elapsed = Date.now() - startRef.current
    const ok = optionIndex === current.correctIndex
    const { multiplier } = comboRef.current.record(ok)
    if (workplaceForSeen) markExamQuestionSeen(workplaceForSeen, current.question)
    if (ok) {
      const base = pointsPerCorrect * multiplier
      const bonus = speedBonusMs(elapsed, { fastMs: speedFastMs, bonusPts: SPEED_BONUS })
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

  if (!questions.length || !current) {
    return (
      <ModuleWrapper title={title} subtitle={subtitle}>
        <p className="text-sm text-slate-600">Cargando preguntas…</p>
      </ModuleWrapper>
    )
  }

  return (
    <ModuleWrapper title={title} subtitle={subtitle}>
      <p className="mb-2 text-sm text-slate-600">
        Pregunta {questionIndex + 1} de {questions.length} · Puntos: {runningTotal}
      </p>

      <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-200 ring-1 ring-amber-300/40">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-[width] duration-75"
          style={{ width: `${barPct}%` }}
        />
      </div>

      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/80 to-white p-4 shadow-inner shadow-amber-100">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">{current.question}</h3>
        <div className="grid gap-2">
          {current.options.map((option, optionIndex) => {
            const isSelected = selected === optionIndex
            let className =
              'rounded-xl border border-amber-200 bg-white px-4 py-3 text-left text-sm text-slate-800 transition hover:border-amber-400 hover:bg-amber-50'
            if (hasAnswered && isSelected) {
              className = answerIsCorrect
                ? 'rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-950'
                : 'rounded-xl border border-rose-400 bg-rose-50 px-4 py-3 text-left text-sm text-rose-950'
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
          <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
            {answerIsCorrect && lastDetail ? (
              <p className="font-semibold text-emerald-700">
                +{lastDetail.base} pts (combo x{lastDetail.multiplier})
                {lastDetail.bonus > 0 ? ` + ${lastDetail.bonus} velocidad` : ''}
              </p>
            ) : (
              <p className="font-semibold text-rose-700">0 pts en esta — sigue.</p>
            )}
            <p>{getQuestionExplanation(current, answerIsCorrect)}</p>
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
