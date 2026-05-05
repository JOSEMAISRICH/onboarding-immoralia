import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { WHO_ASK_PTS } from '../data/workplaceMiniNewFour'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'
import { fingerprintPromptField, readGameResume, writeGameResume } from '../lib/minigameResumeStorage'

/** @param {{ workplace?: string, onComplete: (pts: number) => void, rounds: { id: number, prompt: string, options: { label: string, correct: boolean }[], explanation: string }[] }} props */
function MiniWhoToAsk({ workplace = 'immoralia', onComplete, rounds }) {
  const fingerprint = useMemo(() => fingerprintPromptField(rounds, 'prompt'), [rounds])
  const hydratedForFp = useRef(null)

  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [running, setRunning] = useState(0)
  const scoreRef = useRef(0)

  useLayoutEffect(() => {
    if (!rounds.length) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(workplace, 'miniWhoToAsk', fingerprint)
    if (!s) return
    const qi =
      typeof s.index === 'number' ? Math.max(0, Math.min(s.index, rounds.length - 1)) : 0
    setIndex(qi)
    setPicked(typeof s.picked === 'number' ? s.picked : null)
    const sc = typeof s.score === 'number' ? s.score : 0
    scoreRef.current = sc
    setRunning(sc)
  }, [workplace, fingerprint, rounds])

  useEffect(() => {
    if (!rounds.length || hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, 'miniWhoToAsk', fingerprint, {
      index,
      picked,
      score: scoreRef.current,
    })
  }, [workplace, fingerprint, rounds.length, index, picked, running])

  const r = rounds[index]
  const isLast = index === rounds.length - 1
  const answered = picked !== null
  const choice = picked !== null ? r.options[picked] : null
  const correct = choice?.correct === true

  useReportExamQuestionProgress(index, rounds.length, rounds.length > 0)

  const choose = (i) => {
    if (answered) return
    setPicked(i)
    if (r.options[i]?.correct) {
      scoreRef.current += WHO_ASK_PTS
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

  const maxPts = rounds.length * WHO_ASK_PTS

  return (
    <ModuleWrapper
      title="Minijuego: A quien consultar"
      subtitle={`Casos con preguntas («¿a quién consulto aquí?»): eliges rol u opción; no es un interrogatorio. ${WHO_ASK_PTS} pts por acierto · máx. ${maxPts} pts.`}
    >
      <p className="mb-2 text-sm text-slate-400">
        Caso {index + 1} de {rounds.length} · Total: {running} pts
      </p>
      <p className="mb-4 rounded-xl border border-slate-600/60 bg-slate-900/50 p-4 text-base leading-relaxed text-slate-100">
        {r.prompt}
      </p>
      <div className="grid gap-2">
        {r.options.map((c, i) => {
          const cls =
            answered && picked === i
              ? c.correct
                ? 'border-emerald-400/70 bg-emerald-950/40 text-emerald-50'
                : 'border-rose-400/60 bg-rose-950/30 text-rose-50'
              : 'border-slate-600/70 bg-slate-900/40 text-slate-200 hover:border-violet-500/40'
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
        <div className="mt-4 rounded-xl border border-violet-500/25 bg-violet-950/20 p-3 text-sm text-violet-100/95">
          <p className="font-semibold text-violet-200">{correct ? 'Correcto.' : 'Hay un rol mejor encaje.'}</p>
          <p className="mt-1 text-slate-300">{r.explanation}</p>
          <button
            type="button"
            className="mt-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-bold text-white"
            onClick={advance}
          >
            {isLast ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      ) : null}
    </ModuleWrapper>
  )
}

export default MiniWhoToAsk
