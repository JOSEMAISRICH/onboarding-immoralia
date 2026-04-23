import { useMemo, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { preguntas as preguntasDefault } from '../data/preguntas'

function Quiz({ onComplete, questions: questionsProp = preguntasDefault }) {
  const questions = questionsProp
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewStep, setReviewStep] = useState(0)

  const currentQuestion = questions[questionIndex]
  const hasAnswered = answers[questionIndex] !== undefined
  const isLast = questionIndex === questions.length - 1
  const allAnswered = questions.every((_, i) => answers[i] !== undefined)

  const totalPoints = useMemo(() => {
    return answers.reduce((acc, answer, index) => {
      if (answer === undefined) return acc
      const isCorrect = answer === questions[index].correctAnswer
      return acc + (isCorrect ? 20 : 0)
    }, 0)
  }, [answers, questions])

  const wrongIndices = useMemo(() => {
    return questions
      .map((_, i) => i)
      .filter((i) => answers[i] !== undefined && answers[i] !== questions[i].correctAnswer)
  }, [answers, questions])

  const selectAnswer = (optionIndex) => {
    setAnswers((current) => {
      if (current[questionIndex] !== undefined) return current
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

  return (
    <ModuleWrapper
      title="Minijuego 3: Gran quiz (tu espacio)"
      subtitle="Preguntas alineadas a la teoria del espacio que elegiste. 20 puntos por acierto."
    >
      {!reviewOpen ? (
        <>
          <p className="mb-4 text-sm text-slate-300">
            Pregunta {questionIndex + 1} de {questions.length}
          </p>

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
            <p
              className={`mt-3 text-sm font-semibold ${
                answerIsCorrect ? 'text-emerald-300' : 'text-rose-300'
              }`}
            >
              {answerIsCorrect ? 'Correcto! +20 puntos' : 'Incorrecto. Puedes repasar al final.'}
            </p>
          ) : null}

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-200">Puntos del quiz: {totalPoints}</p>
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
                  onClick={() => onComplete(totalPoints)}
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
