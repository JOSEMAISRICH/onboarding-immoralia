import { useMemo, useState } from 'react'
import ModuleWrapper from './ModuleWrapper'

/**
 * Minijuego tipo quiz secuencial (una pregunta, feedback inmediato).
 * @param {{ question: string, options: string[], correctIndex: number }[]} questions
 */
function MiniQuizPack({
  title,
  subtitle,
  questions,
  pointsPerCorrect = 10,
  onComplete,
  childrenAfterDone = null,
}) {
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

  const advance = () => setQuestionIndex((i) => i + 1)

  const allAnswered = questions.every((_, i) => answers[i] !== undefined)

  return (
    <ModuleWrapper title={title} subtitle={subtitle}>
      <p className="mb-4 text-sm text-slate-300">
        Pregunta {questionIndex + 1} de {questions.length} · Puntos: {totalPoints}
      </p>

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
          <p
            className={`mt-3 text-sm font-semibold ${answerIsCorrect ? 'text-emerald-300' : 'text-rose-300'}`}
          >
            {answerIsCorrect ? `+${pointsPerCorrect} pts` : '0 pts en esta — sigue.'}
          </p>
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
            onClick={() => onComplete(totalPoints)}
            disabled={!allAnswered}
          >
            Terminar minijuego ({totalPoints} pts)
          </button>
        </div>
      ) : null}
    </ModuleWrapper>
  )
}

export default MiniQuizPack
