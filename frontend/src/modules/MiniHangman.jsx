import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'
import { markExamQuestionSeen } from '../lib/examQuestionSelection'
import {
  fingerprintHangman,
  readGameResume,
  writeGameResume,
} from '../lib/minigameResumeStorage'

/** Altura de la cabecera sticky global del examen (ProgressBar), para anclar la pista debajo sin taparla. */
const ONBOARDING_PROGRESS_BAR_ID = 'onboarding-progress-bar'

function useOnboardingProgressBarHeight() {
  const [px, setPx] = useState(120)

  useLayoutEffect(() => {
    const el = document.getElementById(ONBOARDING_PROGRESS_BAR_ID)
    if (!el || typeof ResizeObserver === 'undefined') return undefined

    const update = () => {
      const h = Math.ceil(el.getBoundingClientRect().height)
      setPx(Number.isFinite(h) && h > 0 ? h : 120)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return px
}

const HANGMAN_MAX_WRONG = 7
/** Igual que el quiz anterior: hasta 20 pts por palabra acertada (sin tiempo). */
export const HANGMAN_PTS_PER_WORD = 20

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ'.split('')

function normalizeSecret(word) {
  return String(word ?? '')
    .toUpperCase()
    .replace(/[^A-ZÑ]/g, '')
}

/** Etapas del dibujo según fallos acumulados (0–7). */
function HangmanFigure({ wrong }) {
  const w = Math.max(0, Math.min(HANGMAN_MAX_WRONG, wrong))
  return (
    <svg viewBox="0 0 100 118" className="mx-auto h-40 w-36 shrink-0 text-slate-700" aria-hidden>
      {/* Base */}
      <line x1="8" y1="104" x2="92" y2="104" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {w >= 1 ? (
        <line x1="72" y1="104" x2="72" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      ) : null}
      {w >= 2 ? (
        <line x1="72" y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      ) : null}
      {w >= 3 ? (
        <line x1="38" y1="22" x2="38" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      ) : null}
      {w >= 4 ? (
        <circle cx="38" cy="42" r="8" fill="none" stroke="currentColor" strokeWidth="2.5" />
      ) : null}
      {w >= 5 ? (
        <line x1="38" y1="50" x2="38" y2="74" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      ) : null}
      {w >= 6 ? (
        <>
          <line x1="38" y1="58" x2="26" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="58" x2="50" y2="68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : null}
      {w >= 7 ? (
        <>
          <line x1="38" y1="74" x2="28" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="38" y1="74" x2="48" y2="92" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : null}
    </svg>
  )
}

/**
 * @param {{
 *   workplace?: string,
 *   resumeModuleKey?: string,
 *   rounds: { word: string, clue: string }[],
 *   onComplete: (pts: number) => void,
 * }} props
 */
function MiniHangman({ workplace = 'immoralia', resumeModuleKey = 'quiz', rounds, onComplete }) {
  const fingerprint = useMemo(() => fingerprintHangman(rounds), [rounds])
  const hydratedForFp = useRef(null)

  const [roundIndex, setRoundIndex] = useState(0)
  const [runningTotal, setRunningTotal] = useState(0)
  const [guessed, setGuessed] = useState(/** @type {string[]} */ ([]))
  const [wrongCount, setWrongCount] = useState(0)
  const [done, setDone] = useState(false)
  const [wonRound, setWonRound] = useState(false)

  const current = rounds[roundIndex]
  const secret = useMemo(() => normalizeSecret(current?.word ?? ''), [current?.word])
  const secretLetters = useMemo(() => secret.split('').filter(Boolean), [secret])

  const clueDockRef = useRef(null)
  const progressBarH = useOnboardingProgressBarHeight()

  useReportExamQuestionProgress(roundIndex, rounds.length, Boolean(rounds.length))

  /** Nueva palabra: acercamos la pista al viewport (sticky ya respeta el hueco en el flujo). */
  useLayoutEffect(() => {
    if (!secret.length || done) return
    const id = window.requestAnimationFrame(() => {
      clueDockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
    return () => cancelAnimationFrame(id)
  }, [roundIndex, secret.length, done])

  useLayoutEffect(() => {
    if (!rounds.length) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(workplace, resumeModuleKey, fingerprint)
    if (!s) return
    const ri =
      typeof s.roundIndex === 'number' ? Math.max(0, Math.min(s.roundIndex, rounds.length - 1)) : 0
    setRoundIndex(ri)
    setRunningTotal(typeof s.runningTotal === 'number' ? s.runningTotal : 0)
    setGuessed(Array.isArray(s.guessed) ? s.guessed.map((x) => String(x).toUpperCase()).filter(Boolean) : [])
    setWrongCount(typeof s.wrongCount === 'number' ? s.wrongCount : 0)
    setDone(Boolean(s.done))
    setWonRound(Boolean(s.wonRound))
  }, [workplace, resumeModuleKey, fingerprint, rounds])

  useEffect(() => {
    if (!rounds.length || hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, resumeModuleKey, fingerprint, {
      roundIndex,
      runningTotal,
      guessed,
      wrongCount,
      done,
      wonRound,
    })
  }, [
    workplace,
    resumeModuleKey,
    fingerprint,
    rounds.length,
    roundIndex,
    runningTotal,
    guessed,
    wrongCount,
    done,
    wonRound,
  ])

  const pickLetter = (ch) => {
    const letter = ch.toUpperCase()
    if (!secret || done || !LETTERS.includes(letter)) return
    if (guessed.includes(letter)) return

    const nextGuessed = [...guessed, letter]
    setGuessed(nextGuessed)

    if (!secret.includes(letter)) {
      const nw = wrongCount + 1
      setWrongCount(nw)
      if (nw >= HANGMAN_MAX_WRONG) {
        setDone(true)
        setWonRound(false)
      }
      return
    }

    const complete = secretLetters.every((c) => nextGuessed.includes(c))
    if (complete) {
      setDone(true)
      setWonRound(true)
    }
  }

  const finishRoundAndAdvance = () => {
    if (!current || !secret) return
    markExamQuestionSeen(workplace, `${current.word}|${current.clue}`)
    const add = wonRound ? HANGMAN_PTS_PER_WORD : 0
    const nextRunning = runningTotal + add

    if (roundIndex >= rounds.length - 1) {
      onComplete(nextRunning)
      return
    }

    setRunningTotal(nextRunning)
    setRoundIndex((i) => i + 1)
    setGuessed([])
    setWrongCount(0)
    setDone(false)
    setWonRound(false)
  }

  if (!rounds.length || !current || !secret.length) {
    return (
      <ModuleWrapper title="Minijuego 3: El ahorcado" subtitle="Cargando palabras…">
        <p className="text-sm text-slate-600">Preparando el juego…</p>
      </ModuleWrapper>
    )
  }

  return (
    <ModuleWrapper
      title="Minijuego 3: El ahorcado"
      subtitle={`Herramientas y apps · Sin tiempo límite · ${rounds.length} palabras · hasta ${HANGMAN_PTS_PER_WORD} pts por palabra acertada · máximo ${HANGMAN_MAX_WRONG} fallos por palabra.`}
    >
      {!done ? (
        <div
          ref={clueDockRef}
          className="sticky z-[21] -mx-6 mb-4 border-y border-sky-200/95 bg-white/97 px-6 py-3 shadow-md shadow-sky-100/40 backdrop-blur-md md:-mx-8 md:px-8 supports-[backdrop-filter]:bg-white/90"
          style={{
            top: progressBarH,
            scrollMarginTop: progressBarH + 8,
          }}
        >
          <p className="text-xs font-semibold text-slate-600">
            Palabra {roundIndex + 1} de {rounds.length} · Puntos acumulados:{' '}
            <span className="tabular-nums text-slate-900">{runningTotal}</span>
          </p>
          <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-sky-950">Pista</p>
          <p className="mt-0.5 text-base font-semibold leading-snug text-slate-900">{current.clue}</p>
        </div>
      ) : null}

      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-center md:gap-8">
        <HangmanFigure wrong={wrongCount} />
        <div className="w-full max-w-md flex-1 text-center md:text-left">
          <p className="text-sm text-slate-600">
            Fallos: <strong className="tabular-nums text-slate-900">{wrongCount}</strong> / {HANGMAN_MAX_WRONG}
          </p>
          <div
            className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start"
            role="status"
            aria-live="polite"
          >
            {secretLetters.map((ch, i) => (
              <span
                key={`${i}-${ch}`}
                className="flex h-11 w-10 items-center justify-center rounded-lg border-2 border-slate-300 bg-white font-mono text-xl font-bold uppercase text-slate-900 shadow-inner"
              >
                {guessed.includes(ch) ? ch : '·'}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!done ? (
        <div className="mt-6">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 md:text-left">
            Elige una letra
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:justify-start">
            {LETTERS.map((letter) => {
              const used = guessed.includes(letter)
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={used || done}
                  onClick={() => pickLetter(letter)}
                  className={`flex h-9 min-w-[2rem] items-center justify-center rounded-lg border text-sm font-bold uppercase transition sm:h-10 sm:min-w-[2.25rem] ${
                    used
                      ? 'cursor-default border-slate-200 bg-slate-100 text-slate-400'
                      : 'border-blue-200 bg-white text-blue-950 shadow-sm hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  {letter}
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <div
          className={`mt-6 rounded-2xl border-2 px-4 py-5 text-center shadow-inner md:px-6 ${
            wonRound
              ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50/90'
              : 'border-rose-300 bg-gradient-to-br from-rose-50 to-orange-50/80'
          }`}
        >
          <p className={`text-sm font-bold ${wonRound ? 'text-emerald-900' : 'text-rose-900'}`}>
            {wonRound ? '¡Palabra resuelta!' : 'Se acabaron los intentos fallidos'}
          </p>
          <p className="mt-3 font-mono text-2xl font-extrabold tracking-[0.15em] text-slate-950">{secret}</p>
          <p className="mt-2 text-sm text-slate-700">
            {wonRound
              ? `+${HANGMAN_PTS_PER_WORD} pts en esta palabra.`
              : `0 pts en esta palabra. La palabra era «${secret}».`}
          </p>
          <button
            type="button"
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-700/25 transition hover:brightness-[1.06] active:scale-[0.99]"
            onClick={finishRoundAndAdvance}
          >
            {roundIndex >= rounds.length - 1 ? 'Continuar al siguiente reto' : 'Siguiente palabra'}
          </button>
        </div>
      )}
    </ModuleWrapper>
  )
}

export default MiniHangman
