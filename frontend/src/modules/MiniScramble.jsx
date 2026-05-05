import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import MiniConfetti from '../components/MiniConfetti'
import { MINI_POINTS, palabrasRevueltas as defaultRounds } from '../data/minijuegos'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'
import { fingerprintScrambleRounds, readGameResume, writeGameResume } from '../lib/minigameResumeStorage'

function shuffleLetters(str, seed = 0) {
  const arr = str.split('')
  let s = seed
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = s % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function MiniScramble({ workplace = 'immoralia', onComplete, rounds = defaultRounds }) {
  const fingerprint = useMemo(() => fingerprintScrambleRounds(rounds), [rounds])
  const hydratedForFp = useRef(null)

  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [pool, setPool] = useState([])
  const [built, setBuilt] = useState([])
  const [phase, setPhase] = useState('play')
  const [showConfetti, setShowConfetti] = useState(false)

  useLayoutEffect(() => {
    if (!rounds.length) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(workplace, 'miniScramble', fingerprint)
    if (!s) return
    const qi =
      typeof s.index === 'number' ? Math.max(0, Math.min(s.index, rounds.length - 1)) : 0
    setIndex(qi)
    setScore(typeof s.score === 'number' ? s.score : 0)
  }, [workplace, fingerprint, rounds])

  useEffect(() => {
    if (!rounds.length || hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, 'miniScramble', fingerprint, { index, score })
  }, [workplace, fingerprint, rounds.length, index, score])

  const q = rounds[index]
  const answer = (q.answer || q.options[q.correctIndex] || '').trim()
  const isLast = index === rounds.length - 1
  const maxScr = rounds.length * MINI_POINTS.scramblePerHit

  useReportExamQuestionProgress(index, rounds.length, rounds.length > 0)

  const resetRound = useCallback(() => {
    const letters = shuffleLetters(answer.replace(/\s/g, ''), q.id || index)
    setPool(letters.map((ch, i) => ({ id: `${i}-${ch}`, ch })))
    setBuilt([])
    setPhase('play')
    setShowConfetti(false)
  }, [answer, q.id, index])

  useEffect(() => {
    resetRound()
  }, [index, resetRound])

  const builtWord = built.map((x) => x.ch).join('')
  const isComplete = built.length > 0 && builtWord.length === answer.replace(/\s/g, '').length
  const isCorrectWord = isComplete && builtWord.toLowerCase() === answer.replace(/\s/g, '').toLowerCase()

  const tapPool = (item) => {
    if (phase !== 'play') return
    setPool((p) => p.filter((x) => x.id !== item.id))
    setBuilt((b) => [...b, item])
  }

  const tapBuilt = (item) => {
    if (phase !== 'play') return
    setBuilt((b) => b.filter((x) => x.id !== item.id))
    setPool((p) => [...p, item])
  }

  const checkWord = () => {
    if (phase !== 'play') return
    if (!isComplete) return
    if (isCorrectWord) {
      setPhase('correct')
      setShowConfetti(true)
    } else {
      setPhase('wrong')
    }
  }

  const advance = () => {
    const add = phase === 'correct' ? MINI_POINTS.scramblePerHit : 0
    const nextScore = score + add
    if (isLast) {
      onComplete(nextScore)
      return
    }
    setScore(nextScore)
    setIndex((i) => i + 1)
  }

  const afterWrongContinue = () => {
    resetRound()
  }

  const earned = score + (phase === 'correct' ? MINI_POINTS.scramblePerHit : 0)

  const explainWrong = useMemo(() => {
    if (q.explanation) return q.explanation
    return `La palabra era "${answer}". Ordena las letras tocándolas en secuencia; puedes devolver una letra al pool pulsando sobre la fila de arriba.`
  }, [q.explanation, answer])

  return (
    <ModuleWrapper
      title="Minijuego: Palabra revuelta"
      subtitle={`Ordena las letras para formar la palabra. ${MINI_POINTS.scramblePerHit} pts por acierto. Max ${maxScr} pts.`}
    >
      <p className="mb-2 text-sm text-slate-400">
        Ronda {index + 1} de {rounds.length} · Puntos: {earned}
      </p>

      <div className="relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-slate-950/60 p-4">
        {showConfetti ? (
          <div className="pointer-events-none absolute inset-0">
            <MiniConfetti density={24} />
          </div>
        ) : null}
        <p className="text-sm text-slate-400">{q.hint}</p>
        <p className="mt-2 text-xs text-slate-500">
          Toca las letras de abajo en orden; arriba se forma la palabra. Pulsa una letra de arriba para devolverla.
        </p>

        <div className="mt-4 min-h-[3rem] rounded-xl border border-cyan-500/30 bg-slate-900/80 px-2 py-3">
          <div className="flex min-h-[2.5rem] flex-wrap items-center justify-center gap-1.5">
            {built.length === 0 ? (
              <span className="text-sm text-slate-500">Tu palabra aquí</span>
            ) : (
              built.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={phase !== 'play'}
                  onClick={() => tapBuilt(item)}
                  className="rounded-lg border border-cyan-300/50 bg-cyan-500/20 px-3 py-2 font-mono text-lg font-bold text-cyan-100 transition hover:bg-cyan-500/35 disabled:opacity-50"
                >
                  {item.ch}
                </button>
              ))
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {pool.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={phase !== 'play'}
              onClick={() => tapPool(item)}
              className="rounded-lg border border-slate-500/60 bg-slate-800/90 px-3 py-2 font-mono text-lg font-semibold text-slate-100 transition hover:border-cyan-400/50 hover:bg-slate-700 disabled:opacity-40"
            >
              {item.ch}
            </button>
          ))}
        </div>

        {phase === 'play' ? (
          <button
            type="button"
            disabled={!isComplete}
            onClick={checkWord}
            className="mt-5 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 py-3 text-sm font-bold text-slate-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Comprobar palabra
          </button>
        ) : null}

        {phase === 'correct' ? (
          <p className="mt-4 text-center text-sm font-semibold text-emerald-300">
            +{MINI_POINTS.scramblePerHit} pts — Palabra correcta.
          </p>
        ) : null}

        {phase === 'wrong' ? (
          <div className="mt-4 rounded-xl border border-rose-400/35 bg-rose-950/30 p-3 text-sm leading-relaxed text-rose-100/95">
            <p className="font-semibold text-rose-200">No coincide.</p>
            <p className="mt-2 text-rose-100/90">{explainWrong}</p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl border border-cyan-400/40 bg-slate-900/80 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-slate-800"
              onClick={afterWrongContinue}
            >
              Reintentar esta ronda
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">Puntos: {earned}</p>
        {phase === 'correct' || phase === 'wrong' ? (
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900"
            onClick={advance}
          >
            {isLast ? 'Siguiente minijuego' : 'Siguiente ronda'}
          </button>
        ) : null}
      </div>
    </ModuleWrapper>
  )
}

export default MiniScramble
