import { useMemo, useState } from 'react'
import ModuleWrapper from '../components/ModuleWrapper'
import { MINI_POINTS, paresHerramienta as defaultPairs } from '../data/minijuegos'

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function MiniMatch({ onComplete, pairs = defaultPairs }) {
  const rightShuffled = useMemo(() => shuffle(pairs.map((p) => p.use)), [pairs])
  const [matchedTools, setMatchedTools] = useState(() => new Set())
  const [matchedUses, setMatchedUses] = useState(() => new Set())
  const [selectedToolId, setSelectedToolId] = useState(null)
  const [wrongFlash, setWrongFlash] = useState(false)

  const maxMatch = pairs.length * MINI_POINTS.matchPerPair
  const points = matchedTools.size * MINI_POINTS.matchPerPair
  const allDone = matchedTools.size === pairs.length

  const tryPair = (useText) => {
    if (!selectedToolId || matchedTools.has(selectedToolId) || matchedUses.has(useText)) return
    const pair = pairs.find((p) => p.id === selectedToolId)
    if (pair && pair.use === useText) {
      setMatchedTools((prev) => new Set([...prev, selectedToolId]))
      setMatchedUses((prev) => new Set([...prev, useText]))
      setSelectedToolId(null)
    } else {
      setWrongFlash(true)
      window.setTimeout(() => setWrongFlash(false), 400)
      setSelectedToolId(null)
    }
  }

  return (
    <ModuleWrapper
      title="Minijuego: Empareja rol → foco"
      subtitle={`Toca un rol y luego su foco principal. ${MINI_POINTS.matchPerPair} pts por par. Max ${maxMatch} pts.`}
    >
      <p className="mb-3 text-sm text-slate-400">
        Primero elige a la izquierda, luego la descripcion correcta a la derecha.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-300/80">
            Rol
          </h3>
          <ul className="grid gap-2">
            {pairs.map((p) => {
              const done = matchedTools.has(p.id)
              const sel = selectedToolId === p.id
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    disabled={done}
                    onClick={() => !done && setSelectedToolId(p.id)}
                    className={`w-full rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                      done
                        ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200'
                        : sel
                          ? 'border-cyan-300 ring-2 ring-cyan-300/60 bg-cyan-500/20 text-white'
                          : 'border-cyan-300/30 bg-slate-950/60 text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {p.tool} {done ? ' ✓' : ''}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-300/80">
            Foco
          </h3>
          <ul className={`grid gap-2 ${wrongFlash ? 'ring-2 ring-rose-400/50 rounded-xl' : ''}`}>
            {rightShuffled.map((use) => {
              const used = matchedUses.has(use)
              return (
                <li key={use}>
                  <button
                    type="button"
                    disabled={used}
                    onClick={() => tryPair(use)}
                    className={`w-full rounded-xl border px-3 py-3 text-left text-sm transition ${
                      used
                        ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                        : 'border-cyan-300/30 bg-slate-950/60 text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {use} {used ? '✓' : ''}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-300">
        Puntos: {points} / {maxMatch}
      </p>
      {allDone ? (
        <button
          type="button"
          className="mt-4 rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 font-semibold text-slate-900"
          onClick={() => onComplete(points)}
        >
          Siguiente minijuego
        </button>
      ) : null}
    </ModuleWrapper>
  )
}

export default MiniMatch
