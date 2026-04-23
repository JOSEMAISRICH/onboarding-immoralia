import { useEffect, useRef } from 'react'

const CHEER_LINES = [
  'Modo maquina: ON.',
  'Cada casilla es un mini logro.',
  'Sin prisa: el camino espera.',
  'Psst… la siguiente te va a gustar.',
]

/**
 * Camino tipo Duolingo: lecciones con estado completado / actual / bloqueado.
 * @param {{ units: Array<{ stepIndex: number, title: string, objective: string, minutes: number, emoji: string }>, currentStep: number }} props
 */
function LearningPath({ units, currentStep }) {
  const currentRef = useRef(null)
  const cheerIndex =
    units.length > 0 ? Math.abs(currentStep * 13 + units.length) % CHEER_LINES.length : 0

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [currentStep])

  return (
    <section
      className="rounded-2xl border border-amber-400/25 bg-indigo-950/50 p-4 shadow-inner shadow-amber-900/15 backdrop-blur-sm"
      aria-label="Camino de aprendizaje"
    >
      <div className="mb-4 flex items-center justify-between gap-2 border-b border-amber-500/15 pb-3">
        <h3 className="flex items-center gap-2 text-lg font-bold text-amber-50 md:text-xl">
          <span className="animate-emoji-pop inline-block text-2xl" aria-hidden>
            🗺️
          </span>
          Tu camino
        </h3>
        <span className="rounded-full bg-gradient-to-r from-amber-500/25 to-fuchsia-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-100/95 ring-1 ring-amber-400/25">
          Aventura guiada
        </span>
      </div>
      <p className="mb-2 text-sm font-semibold text-fuchsia-200/90">{CHEER_LINES[cheerIndex]}</p>
      <p className="mb-5 text-xs leading-relaxed text-amber-100/70 md:text-sm">
        Objetivo claro en cada paso; practicas y ves el feedback al momento. Puedes pausar y retomar cuando quieras.
      </p>

      <div className="max-h-[min(420px,52vh)] overflow-y-auto overflow-x-hidden pr-1">
        <ol className="mx-auto max-w-lg">
          {units.map((u, i) => {
            const isDone = currentStep > u.stepIndex
            const isCurrent = currentStep === u.stepIndex
            const isLocked = currentStep < u.stepIndex
            const last = i === units.length - 1

            return (
              <li
                key={u.stepIndex}
                className="animate-path-stagger flex gap-3"
                style={{ animationDelay: `${Math.min(i, 14) * 38}ms` }}
              >
                <div className="flex w-11 shrink-0 flex-col items-center">
                  {i > 0 ? (
                    <div
                      className={`h-4 w-0.5 ${units[i - 1] && currentStep > units[i - 1].stepIndex ? 'bg-emerald-500/55' : 'bg-slate-600/45'}`}
                      aria-hidden
                    />
                  ) : null}
                  <div
                    ref={isCurrent ? currentRef : undefined}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg transition ${
                      isCurrent
                        ? 'animate-wiggle-soft border-amber-400 bg-amber-500/30 shadow-[0_0_22px_rgba(251,191,36,0.45)]'
                        : isDone
                          ? 'border-emerald-400/70 bg-emerald-500/25 text-emerald-100'
                          : 'border-slate-600 bg-slate-900/80 text-slate-500'
                    }`}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isDone ? '✓' : u.emoji}
                  </div>
                  {!last ? (
                    <div
                      className={`mt-0 min-h-[2.75rem] w-0.5 flex-1 ${isDone ? 'bg-emerald-500/45' : 'bg-slate-600/40'}`}
                      aria-hidden
                    />
                  ) : null}
                </div>

                <div
                  className={`mb-5 min-w-0 flex-1 rounded-xl border px-3 py-2.5 transition ${
                    isCurrent
                      ? 'border-amber-400/60 bg-gradient-to-br from-amber-500/25 to-rose-900/25 ring-2 ring-amber-400/30'
                      : isDone
                        ? 'border-emerald-500/25 bg-emerald-950/20'
                        : 'border-slate-700/50 bg-slate-950/40 opacity-80'
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200/80">
                    Unidad {i + 1} · ~{u.minutes} min
                  </p>
                  <p className="mt-1 text-base font-bold leading-snug text-white md:text-lg">{u.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{u.objective}</p>
                  {isCurrent ? (
                    <p className="mt-2 text-xs font-semibold text-amber-200 md:text-sm">
                      Dale caña a la actividad de abajo
                    </p>
                  ) : null}
                  {isLocked ? (
                    <p className="mt-2 text-xs text-slate-500">Candado: completa lo de arriba primero</p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default LearningPath
