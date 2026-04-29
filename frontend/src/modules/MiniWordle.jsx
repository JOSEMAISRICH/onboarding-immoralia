import { useMemo, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { WORDLE_MAX } from '../data/workplaceMiniNewFour'

const MAX_TRIES = 6

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

/** @param {{ onComplete: (pts: number) => void, config: { word: string, clue: string } }} props */
function MiniWordle({ onComplete, config }) {
  const secret = useMemo(() => config.word.toUpperCase(), [config.word])
  const [guesses, setGuesses] = useState(/** @type {string[]} */ ([]))
  const [current, setCurrent] = useState('')
  const [done, setDone] = useState(false)

  const submit = () => {
    const g = current.trim().toUpperCase()
    if (g.length !== secret.length || done) return
    const next = [...guesses, g]
    setGuesses(next)
    setCurrent('')
    if (g === secret) {
      setDone(true)
      onComplete(WORDLE_MAX)
      return
    }
    if (next.length >= MAX_TRIES) {
      setDone(true)
      onComplete(0)
    }
  }

  const letterCls = (status) => {
    if (status === 'correct') return 'bg-emerald-600 text-white border-emerald-400'
    if (status === 'present') return 'bg-amber-600 text-white border-amber-400'
    return 'bg-slate-700 text-slate-200 border-slate-600'
  }

  return (
    <ModuleWrapper
      title="Minijuego: Palabra oculta"
      subtitle={`${MAX_TRIES} intentos. Acierta la palabra de ${secret.length} letras para ${WORDLE_MAX} pts.`}
    >
      <p className="mb-2 text-sm text-cyan-200/90">Pista: {config.clue}</p>
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
        {!done && guesses.length < MAX_TRIES ? (
          <div className="flex gap-1 pt-2">
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
              className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 font-mono uppercase text-white outline-none ring-cyan-500/30 focus:ring-2"
              placeholder={`Escribe ${secret.length} letras`}
              aria-label="Intento actual"
            />
            <button
              type="button"
              onClick={submit}
              className="rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 px-4 py-2 text-sm font-bold text-white"
            >
              Probar
            </button>
          </div>
        ) : null}
      </div>
      {done && guesses[guesses.length - 1] !== secret ? (
        <p className="text-center text-sm text-rose-300">
          La palabra era: <strong className="text-white">{secret}</strong>
        </p>
      ) : null}
    </ModuleWrapper>
  )
}

export default MiniWordle
