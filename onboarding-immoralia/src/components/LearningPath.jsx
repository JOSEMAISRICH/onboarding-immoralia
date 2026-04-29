import { useEffect, useMemo, useRef } from 'react'

const CHEER_LINES = [
  'Modo maquina: ON.',
  'Cada casilla es un mini logro.',
  'Sin prisa: el camino espera.',
  'Psst… la siguiente te va a gustar.',
]

/** Capítulo 0: siempre teoría antes que minijuegos. */
const THEORY_CHAPTER = {
  stepIndex: 0,
  title: 'Teoría y biblioteca',
  objective: 'Lee el contexto de tu espacio y las fichas. Siempre el primer paso.',
  minutes: 15,
  emoji: '📚',
}

/**
 * Camino tipo mapa: capítulos enlazables (nueva pestaña) + estado en el recorrido actual.
 * @param {{ units: Array<{ stepIndex: number, title: string, objective: string, minutes: number, emoji: string }>, currentStep: number }} props
 */
function LearningPath({ units, currentStep }) {
  const currentRef = useRef(null)
  const cheerIndex =
    units.length > 0 ? Math.abs(currentStep * 13 + units.length) % CHEER_LINES.length : 0

  const { theoryHref, minijuegosHref } = useMemo(() => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const root = `${origin}${base}`
    return {
      theoryHref: `${root}/teoria`,
      minijuegosHref: `${root}/minijuegos`,
    }
  }, [])

  const fullUnits = useMemo(() => [THEORY_CHAPTER, ...units], [units])

  const chapterHref = (stepIndex) => (stepIndex === 0 ? theoryHref : minijuegosHref)

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [currentStep])

  return (
    <section
      className="rounded-2xl border border-violet-400/30 bg-gradient-to-b from-indigo-950/70 via-indigo-950/50 to-slate-950/60 p-4 shadow-inner shadow-violet-950/25 backdrop-blur-sm"
      aria-label="Camino de aprendizaje"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-violet-500/20 pb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-200/85">
            Rango del recorrido
          </p>
          <h3 className="mt-1 flex flex-wrap items-center gap-2 text-lg font-bold text-amber-50 md:text-xl">
            <span className="animate-emoji-pop inline-block text-2xl" aria-hidden>
              🗺️
            </span>
            Mapa de capítulos
          </h3>
        </div>
        <span className="rounded-full border border-violet-400/35 bg-violet-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-100/95">
          Clic → nueva pestaña
        </span>
      </div>
      <p className="mb-2 text-sm font-semibold text-fuchsia-200/90">{CHEER_LINES[cheerIndex]}</p>
      <p className="mb-5 text-xs leading-relaxed text-violet-100/75 md:text-sm">
        Cada bloque abre la ruta en otra pestaña (como el enlace de teoría en la barra). Así puedes consultar un
        capítulo sin perder donde ibas. Lo que te falta por descubrir va con candado en tu sesión principal.
      </p>

      <div className="max-h-[min(420px,52vh)] overflow-y-auto overflow-x-hidden pr-1">
        <ol className="mx-auto max-w-lg">
          {fullUnits.map((u, i) => {
            const isDone = currentStep > u.stepIndex
            const isCurrent = currentStep === u.stepIndex
            const isLocked = currentStep < u.stepIndex
            const last = i === fullUnits.length - 1
            const prevDone = i > 0 && currentStep > fullUnits[i - 1].stepIndex
            const href = chapterHref(u.stepIndex)

            return (
              <li
                key={u.stepIndex}
                className="animate-path-stagger flex gap-3"
                style={{ animationDelay: `${Math.min(i, 14) * 38}ms` }}
              >
                <div className="flex w-11 shrink-0 flex-col items-center">
                  {i > 0 ? (
                    <div
                      className={`h-4 w-0.5 ${prevDone ? 'bg-emerald-500/55' : 'bg-slate-600/45'}`}
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

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mb-5 min-w-0 flex-1 rounded-xl border px-3 py-2.5 text-left shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 ${
                    isCurrent
                      ? 'border-amber-400/70 bg-gradient-to-br from-amber-500/30 to-violet-900/30 ring-2 ring-amber-400/35'
                      : isDone
                        ? 'border-emerald-500/35 bg-emerald-950/25 hover:border-emerald-400/50'
                        : 'border-slate-600/60 bg-slate-950/50 hover:border-violet-400/40 hover:bg-slate-900/70'
                  } ${isLocked ? 'opacity-85' : ''}`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-violet-200/90">
                    Capítulo {i + 1} · ~{u.minutes} min
                  </p>
                  <p className="mt-1 text-base font-bold leading-snug text-white md:text-lg">{u.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">
                    {u.objective}
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-violet-200/90">
                    <span className="rounded-md bg-violet-500/20 px-2 py-0.5">↗ Abrir en pestaña nueva</span>
                    {isCurrent ? (
                      <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-amber-100">Tu sesión aquí</span>
                    ) : null}
                    {isLocked ? (
                      <span className="text-slate-500">En la pestaña principal: completa lo anterior</span>
                    ) : null}
                  </p>
                </a>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default LearningPath
