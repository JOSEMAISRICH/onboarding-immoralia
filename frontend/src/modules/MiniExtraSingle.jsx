import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { getQuestionExplanation, getTrueFalseExplanation } from '../lib/questionExplain'
import { EXTRA_POINTS_EACH, extraGames } from '../data/extraMinijuegos10'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'
import { readGameResume, resumeShortHash, writeGameResume } from '../lib/minigameResumeStorage'

function MiniExtraSingle({ workplace = 'immoralia', gameIndex, onComplete }) {
  const game = extraGames[gameIndex]
  const fingerprint = useMemo(
    () => (game ? `${game.key}:${resumeShortHash(game.question)}` : '0'),
    [game],
  )
  const hydratedForFp = useRef(null)
  const moduleKey = game?.key

  const [picked, setPicked] = useState(null)
  const [answered, setAnswered] = useState(false)

  useLayoutEffect(() => {
    if (!game || !moduleKey) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(workplace, moduleKey, fingerprint)
    if (!s) return
    setPicked(s.picked === undefined || s.picked === null ? null : s.picked)
    setAnswered(Boolean(s.answered))
  }, [workplace, fingerprint, game, moduleKey])

  useEffect(() => {
    if (!game || !moduleKey || hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, moduleKey, fingerprint, { picked, answered })
  }, [workplace, moduleKey, fingerprint, picked, answered])

  useReportExamQuestionProgress(0, 1, Boolean(game))

  if (!game) return null

  const isMcq = game.type === 'mcq'
  const isTf = game.type === 'tf'

  const correctMcq = isMcq && picked === game.correctIndex
  const correctTf = isTf && picked === game.correct
  const isCorrect = isMcq ? correctMcq : correctTf

  const submitMcq = (index) => {
    if (answered) return
    setPicked(index)
    setAnswered(true)
  }

  const submitTf = (value) => {
    if (answered) return
    setPicked(value)
    setAnswered(true)
  }

  const advance = () => {
    onComplete(isCorrect ? EXTRA_POINTS_EACH : 0)
  }

  return (
    <ModuleWrapper
      title={`Minijuego extra ${game.badge}`}
      subtitle={game.subtitle}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-cyan-400/90">
        {game.title}
      </p>
      <div className="rounded-2xl border border-violet-400/30 bg-slate-950/60 p-4">
        <p className="text-lg font-medium text-slate-100">{game.question}</p>

        {isMcq ? (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {game.options.map((opt, i) => {
              const sel = picked === i
              let cls =
                'rounded-xl border border-violet-300/35 bg-violet-500/10 px-3 py-3 text-left text-sm transition'
              if (answered && sel) {
                cls = isCorrect
                  ? 'rounded-xl border border-emerald-300/60 bg-emerald-300/20 px-3 py-3 text-left text-sm'
                  : 'rounded-xl border border-rose-300/60 bg-rose-300/20 px-3 py-3 text-left text-sm'
              }
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={answered}
                  className={cls}
                  onClick={() => submitMcq(i)}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        ) : null}

        {isTf ? (
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={answered}
              onClick={() => submitTf(true)}
              className={`rounded-xl px-5 py-3 font-semibold transition ${
                answered
                  ? picked === true
                    ? isCorrect
                      ? 'bg-emerald-500/30 text-emerald-200 ring-2 ring-emerald-400'
                      : 'bg-rose-500/30 text-rose-200 ring-2 ring-rose-400'
                    : 'opacity-40'
                  : 'bg-violet-500/20 text-violet-100 hover:bg-violet-500/30'
              }`}
            >
              Verdadero
            </button>
            <button
              type="button"
              disabled={answered}
              onClick={() => submitTf(false)}
              className={`rounded-xl px-5 py-3 font-semibold transition ${
                answered
                  ? picked === false
                    ? isCorrect
                      ? 'bg-emerald-500/30 text-emerald-200 ring-2 ring-emerald-400'
                      : 'bg-rose-500/30 text-rose-200 ring-2 ring-rose-400'
                    : 'opacity-40'
                  : 'bg-violet-500/20 text-violet-100 hover:bg-violet-500/30'
              }`}
            >
              Falso
            </button>
          </div>
        ) : null}

        {answered ? (
          <div className="mt-3 space-y-2 rounded-xl border border-slate-600/50 bg-slate-900/60 p-3 text-sm leading-relaxed">
            <p className={`font-semibold ${isCorrect ? 'text-emerald-300' : 'text-rose-300'}`}>
              {isCorrect ? `+${EXTRA_POINTS_EACH} pts` : '0 pts en este extra — sigue adelante.'}
            </p>
            <p className="text-slate-300">
              {isMcq
                ? getQuestionExplanation(
                    {
                      options: game.options,
                      correctIndex: game.correctIndex,
                      explanation: game.explanation,
                    },
                    isCorrect,
                  )
                : getTrueFalseExplanation(
                    { text: game.question, correct: game.correct, explanation: game.explanation },
                    isCorrect,
                  )}
            </p>
          </div>
        ) : null}
      </div>

      {answered ? (
        <button
          type="button"
          className="mt-4 rounded-xl bg-gradient-to-r from-violet-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900"
          onClick={advance}
        >
          {gameIndex >= extraGames.length - 1 ? 'Ver resultado final' : 'Siguiente extra'}
        </button>
      ) : null}
    </ModuleWrapper>
  )
}

export default MiniExtraSingle
