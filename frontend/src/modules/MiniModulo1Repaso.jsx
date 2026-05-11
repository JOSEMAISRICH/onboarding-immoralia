import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { getMaxModulo1Registros } from '../lib/workplacePack'
import { normalizeWorkplaceId } from '../data/workplace'
import { fingerprintQuestions, readGameResume, writeGameResume } from '../lib/minigameResumeStorage'
import { markExamQuestionSeen } from '../lib/examQuestionSelection'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'

/**
 * Modulo 1: micro-tests tipo examen (todos los espacios).
 * @param {{ workplace: string, items: Array<{ id: string, title: string, question: string, options: string[], correctIndex: number }>, onComplete: (points: number) => void }} props
 */
function MiniModulo1Repaso({ workplace = 'immoralia', items, onComplete }) {
  const wp = normalizeWorkplaceId(workplace)
  const maxPts = useMemo(() => getMaxModulo1Registros(wp), [wp])
  const fingerprint = useMemo(() => fingerprintQuestions(items), [items])
  const hydratedForFp = useRef(null)

  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hits, setHits] = useState(0)
  const hitsRef = useRef(0)

  useLayoutEffect(() => {
    if (!items.length) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(workplace, 'registros', fingerprint)
    if (!s) return
    const qi =
      typeof s.index === 'number' ? Math.max(0, Math.min(s.index, items.length - 1)) : 0
    setIndex(qi)
    setPicked(typeof s.picked === 'number' ? s.picked : null)
    const h = typeof s.hits === 'number' ? s.hits : 0
    hitsRef.current = h
    setHits(h)
  }, [workplace, fingerprint, items])

  useEffect(() => {
    if (!items.length || hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, 'registros', fingerprint, {
      index,
      picked,
      hits,
    })
  }, [workplace, fingerprint, items.length, index, picked, hits])

  const q = items[index]
  const isLast = index === items.length - 1
  const answered = picked !== null
  const correct = picked === q.correctIndex

  const choose = (optIdx) => {
    if (answered) return
    markExamQuestionSeen(wp, q.question)
    setPicked(optIdx)
    if (optIdx === q.correctIndex) {
      hitsRef.current += 1
      setHits(hitsRef.current)
    }
  }

  const advance = () => {
    if (isLast) {
      onComplete(hitsRef.current * 10)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  const earned = hitsRef.current * 10

  useReportExamQuestionProgress(index, items.length, Boolean(items.length))

  return (
    <ModuleWrapper
      title="Modulo 1: Test rapido"
      subtitle={`Preguntas tipo examen alineadas a tu espacio. 10 pts por acierto. Maximo ${maxPts} pts.`}
    >
      <p className="mb-2 text-sm text-slate-600">
        Pregunta {index + 1} de {items.length}
        {q.title ? (
          <span className="ml-2 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-900">{q.title}</span>
        ) : null}
      </p>
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/70 to-white p-4 shadow-inner shadow-blue-100/60">
        <p className="text-lg font-medium text-slate-900">{q.question}</p>
        <div className="mt-4 grid gap-2">
          {q.options.map((opt, optIdx) => {
            const sel = picked === optIdx
            let cls =
              'rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-800 transition hover:border-blue-300 hover:bg-blue-50/80'
            if (answered) {
              if (optIdx === q.correctIndex) {
                cls =
                  'rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-950'
              } else if (sel) {
                cls = 'rounded-xl border border-rose-400 bg-rose-50 px-4 py-3 text-left text-sm text-rose-950'
              } else {
                cls =
                  'rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-left text-sm text-slate-400 opacity-80'
              }
            }
            return (
              <button
                key={`m1-${index}-opt-${optIdx}`}
                type="button"
                className={cls}
                disabled={answered}
                onClick={() => choose(optIdx)}
              >
                {opt}
              </button>
            )
          })}
        </div>
        {answered ? (
          <p className={`mt-3 text-sm font-semibold ${correct ? 'text-emerald-700' : 'text-rose-700'}`}>
            {correct ? '+10 pts' : 'Incorrecto.'}
          </p>
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-700">
          Puntos: {earned} / {maxPts}
        </p>
        {answered ? (
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:brightness-105"
            onClick={advance}
          >
            {isLast ? 'Siguiente minijuego' : 'Siguiente'}
          </button>
        ) : null}
      </div>
    </ModuleWrapper>
  )
}

export default MiniModulo1Repaso
