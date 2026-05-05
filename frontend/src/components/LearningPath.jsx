import { useEffect, useMemo, useRef } from 'react'

const CHEER_LINES = [
  'Modo maquina: ON.',
  'Cada casilla es un mini logro.',
  'Sin prisa: el camino espera.',
  'Psst… la siguiente te va a gustar.',
]

/** Capítulo 0: teoría en biblioteca antes del examen interactivo. */
const THEORY_CHAPTER = {
  stepIndex: 0,
  title: 'Teoría y biblioteca',
  objective: 'Lee el contexto de tu espacio en la biblioteca de teoría. Es el paso previo al examen.',
  minutes: 15,
  emoji: '📚',
}

/**
 * Camino tipo mapa: estado del recorrido (solo lectura; no enlaza rutas).
 * @param {{ units: Array<{ stepIndex: number, title: string, objective: string, minutes: number, emoji: string }>, currentStep: number }} props
 */
function LearningPath({ units, currentStep, compact = false }) {
  const currentRef = useRef(null)
  const cheerIndex =
    units.length > 0 ? Math.abs(currentStep * 13 + units.length) % CHEER_LINES.length : 0

  const fullUnits = useMemo(() => [THEORY_CHAPTER, ...units], [units])

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [currentStep])

  return (
    <section
      className={`rounded-2xl border border-blue-100/95 bg-gradient-to-b from-white via-blue-50/50 to-emerald-50/40 shadow-inner shadow-blue-100/25 backdrop-blur-sm ${compact ? 'p-3' : 'p-4'}`}
      aria-label="Camino de aprendizaje"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-blue-100/80 pb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-800/90">
            Rango del recorrido
          </p>
          <h3 className={`mt-1 flex flex-wrap items-center gap-2 font-bold text-slate-900 md:text-xl ${compact ? 'text-base' : 'text-lg'}`}>
            <span className="animate-emoji-pop inline-block text-2xl" aria-hidden>
              🗺️
            </span>
            Mapa de capítulos
          </h3>
        </div>
        <span className="rounded-full border border-blue-200/90 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-900">
          Solo estado
        </span>
      </div>
      <p className="mb-2 text-sm font-semibold text-blue-800">{CHEER_LINES[cheerIndex]}</p>
      <p className="mb-5 text-xs leading-relaxed text-slate-600 md:text-sm">
        Vista de lo que ya completaste y lo que sigue en tu sesión principal. No es navegación: usa la barra superior y los botones del flujo para ir a teoría o minijuegos.
      </p>

      <div className={compact ? 'max-h-[min(260px,38vh)] overflow-y-auto overflow-x-hidden pr-1' : 'max-h-[min(420px,52vh)] overflow-y-auto overflow-x-hidden pr-1'}>
        <ol className="mx-auto max-w-lg">
          {fullUnits.map((u, i) => {
            const isDone = currentStep > u.stepIndex
            const isCurrent = currentStep === u.stepIndex
            const isLocked = currentStep < u.stepIndex
            const last = i === fullUnits.length - 1
            const prevDone = i > 0 && currentStep > fullUnits[i - 1].stepIndex

            return (
              <li
                key={u.stepIndex}
                className="animate-path-stagger flex gap-3"
                style={{ animationDelay: `${Math.min(i, 14) * 38}ms` }}
              >
                <div className="flex w-11 shrink-0 flex-col items-center">
                  {i > 0 ? (
                    <div
                      className={`h-4 w-0.5 ${prevDone ? 'bg-emerald-400/70' : 'bg-slate-300/80'}`}
                      aria-hidden
                    />
                  ) : null}
                  <div
                    ref={isCurrent ? currentRef : undefined}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg transition ${
                      isCurrent
                        ? 'animate-wiggle-soft border-amber-500 bg-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.55)]'
                        : isDone
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-white text-slate-400'
                    }`}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isDone ? '✓' : u.emoji}
                  </div>
                  {!last ? (
                    <div
                      className={`mt-0 min-h-[2.75rem] w-0.5 flex-1 ${isDone ? 'bg-emerald-300/80' : 'bg-slate-200/90'}`}
                      aria-hidden
                    />
                  ) : null}
                </div>

                <div
                  className={`mb-5 min-w-0 flex-1 rounded-xl border px-3 py-2.5 text-left shadow-sm transition hover:shadow-md ${
                    isCurrent
                      ? 'border-amber-400/90 bg-gradient-to-br from-amber-50 to-orange-50 ring-2 ring-amber-300/60'
                      : isDone
                        ? 'border-emerald-200 bg-emerald-50/80'
                        : 'border-slate-200 bg-white/90'
                  } ${isLocked ? 'opacity-80' : ''}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-800/95">
                    Capítulo {i + 1} · ~{u.minutes} min
                  </p>
                  <p className="mt-1 text-base font-bold leading-snug text-slate-900 md:text-lg">{u.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{u.objective}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-blue-900">
                    {isCurrent ? (
                      <span className="rounded-md bg-amber-200/80 px-2 py-0.5 text-amber-950">Tu sesión aquí</span>
                    ) : null}
                    {isLocked ? (
                      <span className="text-slate-500">En la pestaña principal: completa lo anterior</span>
                    ) : null}
                  </p>
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
