import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { WORDLE_MAX, WORDLE_MAX_TRIES } from '../data/workplaceMiniNewFour'
import { fingerprintWordle, readGameResume, writeGameResume } from '../lib/minigameResumeStorage'
import { useReportExamQuestionProgress } from '../context/ExamProgressContext'

function evaluateGuess(secret, guess) {
  const n = secret.length
  const s = secret.toUpperCase().split('')
  const g = guess.toUpperCase().split('')
  if (g.length !== n) return Array(n).fill('absent')
  /** @type {('correct'|'present'|'absent')[]} */
  const result = Array(n).fill('absent')
  const counts = {}
  s.forEach((ch) => {
    counts[ch] = (counts[ch] || 0) + 1
  })
  for (let i = 0; i < n; i += 1) {
    if (g[i] === s[i]) {
      result[i] = 'correct'
      counts[g[i]] -= 1
    }
  }
  for (let i = 0; i < n; i += 1) {
    if (result[i] === 'correct') continue
    if (counts[g[i]] > 0) {
      result[i] = 'present'
      counts[g[i]] -= 1
    }
  }
  return result
}

/** Por cada posición: letra ya confirmada (verde en algún intento), o null si aún no. */
function computeLockedLetters(secret, guesses) {
  const n = secret.length
  const slots = /** @type {(string | null)[]} */ (Array(n).fill(null))
  for (const gw of guesses) {
    const g = gw.trim().toUpperCase()
    if (g.length !== n) continue
    const ev = evaluateGuess(secret, g)
    for (let i = 0; i < n; i += 1) {
      if (ev[i] === 'correct') slots[i] = secret[i]
    }
  }
  return slots
}

/** @param {{ workplace?: string, onComplete: (pts: number) => void, config: { word: string, clue: string }, examRoundOffset?: number, examTotalSlots?: number, roundMeta?: { current: number, total: number } | null, continueLabel?: string }} props */
function MiniWordle({
  workplace = 'immoralia',
  onComplete,
  config,
  examRoundOffset = 0,
  examTotalSlots = WORDLE_MAX_TRIES,
  roundMeta = null,
  continueLabel,
}) {
  const secret = useMemo(() => config.word.toUpperCase(), [config.word])
  const fingerprint = useMemo(() => fingerprintWordle(config), [config])
  const hydratedForFp = useRef(null)

  const [guesses, setGuesses] = useState(/** @type {string[]} */ ([]))
  const [current, setCurrent] = useState('')
  const [done, setDone] = useState(false)

  useLayoutEffect(() => {
    if (!config?.word) return
    if (hydratedForFp.current === fingerprint) return
    hydratedForFp.current = fingerprint
    const s = readGameResume(workplace, 'miniWordle', fingerprint)
    if (!s) return
    setGuesses(Array.isArray(s.guesses) ? s.guesses : [])
    setCurrent(typeof s.current === 'string' ? s.current : '')
    setDone(Boolean(s.done))
  }, [workplace, fingerprint, config])

  useEffect(() => {
    if (!config?.word || hydratedForFp.current !== fingerprint) return
    writeGameResume(workplace, 'miniWordle', fingerprint, { guesses, current, done })
  }, [workplace, fingerprint, config.word, guesses, current, done])

  const progressIdx = examRoundOffset * WORDLE_MAX_TRIES + (done ? WORDLE_MAX_TRIES - 1 : guesses.length)
  useReportExamQuestionProgress(progressIdx, examTotalSlots, Boolean(config?.word))

  const submit = () => {
    const g = current.trim().toUpperCase()
    if (g.length !== secret.length || done) return
    const next = [...guesses, g]
    setGuesses(next)
    setCurrent('')
    if (g === secret) {
      setDone(true)
      return
    }
    if (next.length >= WORDLE_MAX_TRIES) {
      setDone(true)
    }
  }

  const letterCls = (status) => {
    if (status === 'correct') return 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
    if (status === 'present') return 'bg-amber-500 text-white border-amber-400 shadow-sm'
    return 'bg-slate-200 text-slate-800 border-slate-300'
  }

  const lastGuess = guesses.length ? guesses[guesses.length - 1] : ''
  const won = Boolean(done && lastGuess === secret)

  const finishRound = () => {
    onComplete(won ? WORDLE_MAX : 0)
  }

  const attemptNum = guesses.length + (done ? 0 : 1)

  const lockedByPosition = useMemo(() => computeLockedLetters(secret, guesses), [secret, guesses])

  return (
    <ModuleWrapper
      title="Minijuego: Palabra oculta"
      subtitle={`${roundMeta ? `Ronda ${roundMeta.current} de ${roundMeta.total} · ` : ''}${WORDLE_MAX_TRIES} intentos por palabra · ${secret.length} letras · Hasta ${WORDLE_MAX} pts si aciertas esta palabra.`}
    >
      <div className="mb-4 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50/90 px-4 py-3 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-wider text-sky-950">Pista</p>
        <p className="mt-1 text-base font-semibold leading-snug text-slate-900">{config.clue}</p>
      </div>

      <div className="mb-4 rounded-xl border border-emerald-200/90 bg-emerald-50/40 px-3 py-3 shadow-sm">
        <p className="text-center text-[11px] font-bold uppercase tracking-wider text-emerald-950">
          Letras bien colocadas (en orden)
        </p>
        <p className="mt-1 text-center text-xs text-slate-600">
          Se rellena cada casilla cuando esa letra sale verde en algun intento.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {lockedByPosition.map((ch, i) => (
            <span
              key={i}
              className={`flex h-11 min-w-[2.25rem] items-center justify-center rounded-lg border-2 px-1 font-mono text-xl font-bold uppercase tabular-nums sm:h-12 sm:min-w-[2.5rem] sm:text-2xl ${
                ch
                  ? 'border-emerald-400 bg-emerald-100 text-emerald-950 shadow-inner'
                  : 'border-slate-300 bg-white text-slate-400'
              }`}
              aria-label={ch ? `Letra ${i + 1}: ${ch}` : `Letra ${i + 1}: aun sin acierto en posicion`}
            >
              {ch ?? '—'}
            </span>
          ))}
        </div>
      </div>

      <p className="mb-3 text-sm font-semibold text-slate-700">
        {done ? (
          <>Partida terminada · Intentos usados: {guesses.length} de {WORDLE_MAX_TRIES}</>
        ) : (
          <>
            Intento {attemptNum} de {WORDLE_MAX_TRIES} — escribe la palabra y pulsa Probar (o Enter).
          </>
        )}
      </p>

      <div className="mb-4 space-y-1">
        {guesses.map((gw, row) => {
          const ev = evaluateGuess(secret, gw)
          return (
            <div key={row} className="flex gap-1">
              {gw.split('').map((ch, i) => (
                <span
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded border text-lg font-bold uppercase ${letterCls(
                    ev[i] || 'absent',
                  )}`}
                >
                  {ch}
                </span>
              ))}
            </div>
          )
        })}
        {!done && guesses.length < WORDLE_MAX_TRIES ? (
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-stretch">
            <input
              type="text"
              maxLength={secret.length}
              value={current}
              onChange={(e) =>
                setCurrent(e.target.value.replace(/[^a-zA-ZñÑ]/g, '').slice(0, secret.length))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
              }}
              className="min-h-[2.75rem] flex-1 rounded-xl border-2 border-slate-300 bg-white px-3 py-2 font-mono text-lg font-bold uppercase tracking-widest text-slate-900 shadow-inner outline-none ring-blue-400/30 focus:border-blue-500 focus:ring-2"
              placeholder={`${secret.length} letras`}
              aria-label="Intento actual: escribe la palabra"
            />
            <button
              type="button"
              onClick={submit}
              disabled={current.trim().length !== secret.length}
              className="min-h-[2.75rem] shrink-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-emerald-900/15 transition hover:brightness-[1.05] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Probar palabra
            </button>
          </div>
        ) : null}
      </div>

      {done ? (
        <div
          className={`rounded-2xl border-2 px-4 py-5 text-center shadow-inner md:px-6 ${
            won
              ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50/90'
              : 'border-rose-300 bg-gradient-to-br from-rose-50 to-orange-50/80'
          }`}
        >
          <p className={`text-sm font-bold ${won ? 'text-emerald-900' : 'text-rose-900'}`}>
            {won ? '¡Acertaste!' : 'Sin intentos restantes'}
          </p>
          <p className="mt-3 font-mono text-3xl font-extrabold tracking-[0.25em] text-slate-950 md:text-4xl">
            {secret}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            {won
              ? `Ganas ${WORDLE_MAX} pts. La palabra secreta era «${secret}».`
              : `La palabra secreta era «${secret}». En esta ronda: 0 pts.`}
          </p>
          <button
            type="button"
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-700/25 transition hover:brightness-[1.06] active:scale-[0.99]"
            onClick={finishRound}
          >
            {continueLabel ?? 'Continuar'}
          </button>
        </div>
      ) : null}
    </ModuleWrapper>
  )
}

export default MiniWordle
